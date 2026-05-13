'use client';

import { useState, useEffect, useCallback } from 'react';

const API_HEADERS = (password) => ({
  'Content-Type': 'application/json',
  'X-Admin-Password': password || '',
});

export default function AdminReviewsPage() {
  const [password, setPassword] = useState('');
  const [storedPassword, setStoredPassword] = useState('');
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [loginError, setLoginError] = useState('');
  const [storageChecked, setStorageChecked] = useState(false);

  const loadReviews = useCallback(async () => {
    const pwd = storedPassword || (typeof window !== 'undefined' ? sessionStorage.getItem('adminReviewsPassword') : null);
    if (!pwd) return;
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/admin/reviews', {
        headers: API_HEADERS(pwd),
      });
      if (res.status === 401) {
        setStoredPassword('');
        if (typeof window !== 'undefined') sessionStorage.removeItem('adminReviewsPassword');
        setLoginError('Invalid password');
        setReviews([]);
        return;
      }
      if (!res.ok) throw new Error('Failed to load reviews');
      const data = await res.json();
      setReviews(data);
      setLoginError('');
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, [storedPassword]);

  useEffect(() => {
    const pwd = typeof window !== 'undefined' ? sessionStorage.getItem('adminReviewsPassword') : null;
    if (pwd) setStoredPassword(pwd);
    setStorageChecked(true);
  }, []);

  useEffect(() => {
    if (storedPassword) loadReviews();
  }, [storedPassword, loadReviews]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (!password.trim()) return;
    setStoredPassword(password);
    if (typeof window !== 'undefined') sessionStorage.setItem('adminReviewsPassword', password);
  };

  const handleDelete = async (id) => {
    if (!confirm('Permanently delete this review?')) return;
    const pwd = storedPassword || (typeof window !== 'undefined' ? sessionStorage.getItem('adminReviewsPassword') : null);
    if (!pwd) return;
    try {
      const res = await fetch(`/api/admin/reviews/${id}`, {
        method: 'DELETE',
        headers: API_HEADERS(pwd),
      });
      if (res.status === 401) {
        setStoredPassword('');
        if (typeof window !== 'undefined') sessionStorage.removeItem('adminReviewsPassword');
        setLoginError('Session expired');
        return;
      }
      if (!res.ok) throw new Error('Failed to delete');
      await loadReviews();
    } catch (e) {
      setError(e.message);
    }
  };

  const handleApproveReject = async (id, status) => {
    const pwd = storedPassword || (typeof window !== 'undefined' ? sessionStorage.getItem('adminReviewsPassword') : null);
    if (!pwd) return;
    try {
      const res = await fetch(`/api/admin/reviews/${id}`, {
        method: 'PATCH',
        headers: API_HEADERS(pwd),
        body: JSON.stringify({ status }),
      });
      if (res.status === 401) {
        setStoredPassword('');
        if (typeof window !== 'undefined') sessionStorage.removeItem('adminReviewsPassword');
        setLoginError('Session expired');
        return;
      }
      if (!res.ok) throw new Error('Failed to update');
      await loadReviews();
    } catch (e) {
      setError(e.message);
    }
  };

  if (!storageChecked) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <p className="text-gray-600">Loading…</p>
      </div>
    );
  }

  if (!storedPassword) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <form onSubmit={handleLogin} className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Admin – Reviews</h1>
          <p className="text-gray-600 mb-4">Enter admin password to manage reviews.</p>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full p-3 border border-gray-300 rounded-md mb-4"
            autoFocus
          />
          {loginError && <p className="text-red-600 text-sm mb-2">{loginError}</p>}
          <button type="submit" className="w-full bg-black text-white py-3 rounded-md hover:bg-gray-800">
            Log in
          </button>
        </form>
      </div>
    );
  }

  const pending = reviews.filter((r) => r.status === 'pending');
  const approved = reviews.filter((r) => r.status === 'approved');
  const rejected = reviews.filter((r) => r.status === 'rejected');

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8 pt-24">
      <div className="max-w-4xl mx-auto pt-24">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Review moderation</h1>
          <button
            type="button"
            onClick={() => {
              setStoredPassword('');
              if (typeof window !== 'undefined') sessionStorage.removeItem('adminReviewsPassword');
            }}
            className="text-sm text-gray-600 hover:text-gray-800"
          >
            Log out
          </button>
        </div>

        {loginError && <p className="text-red-600 mb-4">{loginError}</p>}
        {error && <p className="text-red-600 mb-4">{error}</p>}

        {loading ? (
          <p className="text-gray-600">Loading reviews…</p>
        ) : (
          <>
            {pending.length > 0 && (
              <section className="mb-8">
                <h2 className="text-xl font-semibold text-gray-800 mb-3">
                  Pending ({pending.length})
                </h2>
                <ul className="space-y-4">
                  {pending.map((r) => (
                    <li
                      key={r._id}
                      className="bg-white p-4 rounded-lg shadow border border-gray-200"
                    >
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <span className="font-semibold text-gray-800">{r.name}</span>
                        <span className="text-gray-500">·</span>
                        <span className="text-gray-600">{r.title}</span>
                        <span className="text-amber-500">
                          {'★'.repeat(r.stars)}{'☆'.repeat(5 - r.stars)}
                        </span>
                      </div>
                      <p className="text-gray-700 mb-3">{r.words}</p>
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => handleApproveReject(r._id, 'approved')}
                          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                        >
                          Approve
                        </button>
                        <button
                          type="button"
                          onClick={() => handleApproveReject(r._id, 'rejected')}
                          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                        >
                          Reject
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(r._id)}
                          className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-black"
                        >
                          Delete
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              </section>
            )}
            {(approved.length > 0 || rejected.length > 0) && (
              <section>
                <h2 className="text-xl font-semibold text-gray-800 mb-3">All reviews</h2>
                <ul className="space-y-3">
                  {reviews.map((r) => (
                    <li
                      key={r._id}
                      className="bg-white p-4 rounded-lg shadow border border-gray-200 flex flex-wrap items-center justify-between gap-2"
                    >
                      <div>
                        <span className="font-semibold text-gray-800">{r.name}</span>
                        <span className="text-gray-500 mx-1">·</span>
                        <span className="text-gray-600">{r.title}</span>
                        <span className="text-amber-500 ml-1">
                          {'★'.repeat(r.stars)}{'☆'.repeat(5 - r.stars)}
                        </span>
                        <p className="text-gray-600 text-sm mt-1 line-clamp-2">{r.words}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span
                          className={`px-2 py-1 rounded text-sm font-medium ${
                            r.status === 'approved'
                              ? 'bg-green-100 text-green-800'
                              : r.status === 'rejected'
                              ? 'bg-red-100 text-red-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}
                        >
                          {r.status}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleDelete(r._id)}
                          className="px-3 py-1 bg-gray-800 text-white text-sm rounded hover:bg-black"
                        >
                          Delete
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              </section>
            )}
            {reviews.length === 0 && !loading && (
              <p className="text-gray-600">No reviews yet.</p>
            )}
          </>
        )}
      </div>
    </div>
  );
}
