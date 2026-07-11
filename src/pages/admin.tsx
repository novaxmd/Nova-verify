import { useEffect, useState } from "react";
import Head from "next/head";
import TopBar from "@/components/TopBar";
import {
  saveAdminToken,
  getAdminToken,
  clearAdminToken,
  adminFetch,
  isAdminSession,
} from "@/lib/adminClient";
import type { Contact } from "@/types";

export default function AdminPage() {
  const [unlocked, setUnlocked] = useState(false);
  const [checkingSession, setCheckingSession] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loggingIn, setLoggingIn] = useState(false);

  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loadingList, setLoadingList] = useState(false);
  const [listError, setListError] = useState("");
  const [search, setSearch] = useState("");
  const [editingId, setEditingId] = useState<string | number | null>(null);
  const [editName, setEditName] = useState("");
  const [editPhone, setEditPhone] = useState("");
  const [rowBusyId, setRowBusyId] = useState<string | number | null>(null);
  const [dedupeRunning, setDedupeRunning] = useState(false);

  useEffect(() => {
    if (isAdminSession()) {
      setUnlocked(true);
      loadContacts();
    }
    setCheckingSession(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadContacts = async () => {
    setLoadingList(true);
    setListError("");
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 20000); // 20s safety timeout
    try {
      const res = await adminFetch("/api/admin/list", { signal: controller.signal });
      if (res.status === 401) {
        clearAdminToken();
        setUnlocked(false);
        return;
      }
      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        setListError(errData.error || `Failed to load contacts (status ${res.status}).`);
        setContacts([]);
        return;
      }
      const data = await res.json().catch(() => null);
      if (data && Array.isArray(data.contacts)) {
        setContacts(data.contacts);
      } else {
        setListError("Unexpected response from server while loading contacts.");
        setContacts([]);
      }
    } catch (err) {
      console.error("loadContacts failed:", err);
      if (err instanceof Error && err.name === "AbortError") {
        setListError("Loading contacts timed out. Tap search (with empty box) to retry, or reload the page.");
      } else {
        setListError("Failed to load registered contacts. Check your connection and try again.");
      }
      setContacts([]);
    } finally {
      clearTimeout(timeoutId);
      setLoadingList(false);
    }
  };

  const handleLogin = async () => {
    if (!username.trim()) {
      setLoginError("Enter the admin username.");
      return;
    }
    if (!password) {
      setLoginError("Enter the admin password.");
      return;
    }
    setLoggingIn(true);
    setLoginError("");
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: username.trim(), password }),
      });
      const data = await res.json();
      if (data.success && data.token) {
        saveAdminToken(data.token);
        setUnlocked(true);
        setUsername("");
        setPassword("");
        loadContacts();
      } else {
        setLoginError(data.error || "Incorrect username or password.");
      }
    } catch {
      setLoginError("Network error. Try again.");
    } finally {
      setLoggingIn(false);
    }
  };

  const handleLogout = () => {
    clearAdminToken();
    setUnlocked(false);
    setContacts([]);
  };

  const handleDownload = async (kind: "vcf" | "pdf") => {
    const token = getAdminToken();
    const url = kind === "vcf" ? "/api/admin/download-vcf" : "/api/admin/download-pdf";
    try {
      const res = await fetch(url, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({ error: "Download failed" }));
        alert(data.error || "Download failed");
        return;
      }
      const blob = await res.blob();
      const blobUrl = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = blobUrl;
      a.download = kind === "vcf" ? "contacts.vcf" : "contacts.pdf";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(blobUrl);
    } catch {
      alert("Download failed. Please try again.");
    }
  };

  const handleSearch = async () => {
    if (!search.trim()) {
      loadContacts();
      return;
    }
    setLoadingList(true);
    try {
      const res = await adminFetch("/api/admin/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: search.trim() }),
      });
      const data = await res.json();
      if (Array.isArray(data)) {
        setContacts(data);
      } else {
        setListError(data.error || "Search failed.");
      }
    } catch {
      setListError("Search failed.");
    } finally {
      setLoadingList(false);
    }
  };

  const startEdit = (c: Contact) => {
    setEditingId(c.id ?? null);
    setEditName(c.name || "");
    setEditPhone(c.phone || "");
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditName("");
    setEditPhone("");
  };

  const saveEdit = async (id: string | number) => {
    setRowBusyId(id);
    try {
      const res = await adminFetch("/api/admin/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, name: editName.trim(), phone: editPhone.trim() }),
      });
      const data = await res.json();
      if (data.success) {
        setContacts((prev) =>
          prev.map((c) => (c.id === id ? { ...c, name: editName.trim(), phone: editPhone.trim() } : c))
        );
        cancelEdit();
      } else {
        alert(data.error || "Failed to update contact.");
      }
    } catch {
      alert("Network error while updating contact.");
    } finally {
      setRowBusyId(null);
    }
  };

  const handleDelete = async (id: string | number) => {
    if (!confirm("Delete this contact? This cannot be undone.")) return;
    setRowBusyId(id);
    try {
      const res = await adminFetch("/api/admin/delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      const data = await res.json();
      if (data.success) {
        setContacts((prev) => prev.filter((c) => c.id !== id));
      } else {
        alert(data.error || "Failed to delete contact.");
      }
    } catch {
      alert("Network error while deleting contact.");
    } finally {
      setRowBusyId(null);
    }
  };

  const handleDedupe = async () => {
    if (!confirm("Remove all repeated phone numbers, keeping the earliest entry for each?")) return;
    setDedupeRunning(true);
    try {
      const res = await adminFetch("/api/admin/dedupe", { method: "POST" });
      const data = await res.json();
      if (data.success) {
        alert(`Removed ${data.removed} duplicate contact(s).`);
        loadContacts();
      } else {
        alert(data.error || "Failed to remove duplicates.");
      }
    } catch {
      alert("Network error while removing duplicates.");
    } finally {
      setDedupeRunning(false);
    }
  };

  if (checkingSession) {
    return null;
  }

  if (!unlocked) {
    return (
      <>
        <Head>
          <title>Admin Login · BMB VCF</title>
        </Head>
        <div className="page">
          <TopBar title="BMB VCF" />
          <div className="card admin-lock-panel">
            <div className="admin-lock-icon">
              <i className="fas fa-lock" />
            </div>
            <div className="section-title" style={{ fontSize: "1.3rem" }}>
              Admin Access
            </div>
            <div className="section-subtitle">
              Enter the admin password to unlock downloads and the registered list.
            </div>
            <input
              type="text"
              className="input-modern"
              placeholder="Admin username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
              autoFocus
              autoComplete="off"
            />
            <input
              type="password"
              className="input-modern"
              placeholder="Admin password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
            />
            {loginError && <div className="error-text">{loginError}</div>}
            <button
              className="btn btn-primary btn-block"
              onClick={handleLogin}
              disabled={loggingIn}
            >
              {loggingIn ? (
                <>
                  <span className="spinner" /> Verifying...
                </>
              ) : (
                <>
                  <i className="fas fa-unlock" /> Unlock
                </>
              )}
            </button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Command Center · BMB VCF</title>
      </Head>
      <div className="page">
        <TopBar title="BMB VCF" />

        <div className="card-header">
          <div>
            <div className="section-title" style={{ marginBottom: 2 }}>
              Command Center
            </div>
            <div className="section-subtitle" style={{ marginBottom: 0 }}>
              Welcome back, admin
            </div>
          </div>
          <button className="btn btn-ghost-purple" onClick={handleLogout}>
            <i className="fas fa-right-from-bracket" /> Logout
          </button>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">
              <i className="fas fa-address-book" />
            </div>
            <div className="stat-label">Total Registered</div>
            <div className="stat-value">{contacts.length}</div>
            <div className="stat-foot">contacts in directory</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">
              <i className="fas fa-shield-halved" />
            </div>
            <div className="stat-label">Access</div>
            <div className="stat-value" style={{ fontSize: "1.2rem" }}>
              Admin
            </div>
            <div className="stat-foot">session active</div>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <span className="card-label">Exports</span>
          </div>
          <div className="btn-group">
            <button className="btn btn-primary" onClick={() => handleDownload("vcf")}>
              <i className="fas fa-file-arrow-down" /> Download VCF
            </button>
            <button className="btn btn-secondary" onClick={() => handleDownload("pdf")}>
              <i className="fas fa-file-pdf" /> Download PDF
            </button>
          </div>
          <div className="btn-group" style={{ marginTop: 10 }}>
            <button
              className="btn btn-ghost-purple btn-block"
              onClick={handleDedupe}
              disabled={dedupeRunning}
            >
              {dedupeRunning ? (
                <>
                  <span className="spinner" /> Removing duplicates...
                </>
              ) : (
                <>
                  <i className="fas fa-broom" /> Remove Duplicate Numbers
                </>
              )}
            </button>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <span className="card-label">Registered Contacts</span>
          </div>
          <div className="phone-row" style={{ marginBottom: 12 }}>
            <input
              type="text"
              className="input-modern"
              style={{ marginBottom: 0 }}
              placeholder="Search by name or phone..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            />
            <button className="btn btn-secondary" onClick={handleSearch} style={{ flex: "0 0 auto" }}>
              <i className="fas fa-magnifying-glass" />
            </button>
            {search.trim() !== "" && (
              <button
                className="btn btn-ghost-purple"
                style={{ flex: "0 0 auto" }}
                onClick={() => {
                  setSearch("");
                  loadContacts();
                }}
                title="Clear search and show all"
              >
                <i className="fas fa-xmark" />
              </button>
            )}
          </div>

          {listError && <div className="error-text">{listError}</div>}

          {loadingList ? (
            <div className="section-subtitle" style={{ textAlign: "center" }}>
              <span className="spinner" /> Loading...
            </div>
          ) : contacts.length === 0 ? (
            <div className="section-subtitle" style={{ textAlign: "center" }}>
              No contacts found.
            </div>
          ) : (
            <div className="table-wrap">
              <table className="roster">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Phone</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {contacts.map((c, i) => {
                    const rowId = c.id ?? c.phone;
                    const isEditing = editingId !== null && editingId === c.id;
                    const isBusy = rowBusyId !== null && rowBusyId === c.id;
                    return (
                      <tr key={rowId}>
                        <td>{i + 1}</td>
                        {isEditing ? (
                          <>
                            <td>
                              <input
                                type="text"
                                className="input-modern"
                                style={{ marginBottom: 0, padding: "6px 10px" }}
                                value={editName}
                                onChange={(e) => setEditName(e.target.value)}
                              />
                            </td>
                            <td>
                              <input
                                type="text"
                                className="input-modern"
                                style={{ marginBottom: 0, padding: "6px 10px" }}
                                value={editPhone}
                                onChange={(e) => setEditPhone(e.target.value)}
                              />
                            </td>
                            <td>
                              <div style={{ display: "flex", gap: 6 }}>
                                <button
                                  className="btn btn-primary"
                                  style={{ padding: "6px 10px", fontSize: "0.75rem" }}
                                  onClick={() => c.id !== undefined && saveEdit(c.id)}
                                  disabled={isBusy}
                                >
                                  {isBusy ? <span className="spinner" /> : <i className="fas fa-check" />}
                                </button>
                                <button
                                  className="btn btn-secondary"
                                  style={{ padding: "6px 10px", fontSize: "0.75rem" }}
                                  onClick={cancelEdit}
                                  disabled={isBusy}
                                >
                                  <i className="fas fa-xmark" />
                                </button>
                              </div>
                            </td>
                          </>
                        ) : (
                          <>
                            <td>{c.name || "—"}</td>
                            <td>{c.phone}</td>
                            <td>
                              <div style={{ display: "flex", gap: 6 }}>
                                <button
                                  className="btn btn-ghost-purple"
                                  style={{ padding: "6px 10px", fontSize: "0.75rem" }}
                                  onClick={() => startEdit(c)}
                                  title="Edit"
                                >
                                  <i className="fas fa-pen" />
                                </button>
                                <button
                                  className="btn btn-secondary"
                                  style={{ padding: "6px 10px", fontSize: "0.75rem", borderColor: "#ff6b6b", color: "#ff6b6b" }}
                                  onClick={() => c.id !== undefined && handleDelete(c.id)}
                                  disabled={isBusy}
                                  title="Delete"
                                >
                                  {isBusy ? <span className="spinner" /> : <i className="fas fa-trash" />}
                                </button>
                              </div>
                            </td>
                          </>
                        )}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
