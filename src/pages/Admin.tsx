import React, { useState, useEffect } from "react";
import { auth, loginWithGoogle, logout, db } from "../lib/firebase";
import { onAuthStateChanged, User } from "firebase/auth";
import { collection, onSnapshot, doc, setDoc, addDoc, deleteDoc, updateDoc, query, orderBy } from "firebase/firestore";
import { MenuItem, BakerySettings } from "../types";
import { Save, Plus, Trash, LogOut, Check, X, Edit3, Star } from "lucide-react";
import { motion } from "motion/react";
import { Helmet } from "react-helmet-async";

const envAdminEmails = import.meta.env.VITE_ADMIN_EMAILS;
const ADMIN_EMAILS = envAdminEmails 
  ? envAdminEmails.split(",").map((e: string) => e.trim().toLowerCase())
  : ["prokic.nico@gmail.com", "sdjacqueline@gmail.com"];

enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
  }
}

export default function Admin() {
  const [user, setUser] = useState<User | null>(null);
  const [items, setItems] = useState<MenuItem[]>([]);
  const [settings, setSettings] = useState<BakerySettings>({ cakeOfTheDay: "" });
  const [loading, setLoading] = useState(true);
  const [loginError, setLoginError] = useState<string | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [justSavedCake, setJustSavedCake] = useState(false);
  const [justAddedItem, setJustAddedItem] = useState(false);
  const [newItem, setNewItem] = useState<Partial<MenuItem>>({ name: "", price: 0, category: "Kuchen" });

  const handleFirestoreError = (error: unknown, operationType: OperationType, path: string | null) => {
    const errInfo: FirestoreErrorInfo = {
      error: error instanceof Error ? error.message : String(error),
      authInfo: {
        userId: auth.currentUser?.uid,
        email: auth.currentUser?.email,
        emailVerified: auth.currentUser?.emailVerified,
        isAnonymous: auth.currentUser?.isAnonymous,
      },
      operationType,
      path
    };
    console.error('Firestore Error Detailed: ', JSON.stringify(errInfo, null, 2));
    // Also show it to the user in this specific case
    if (operationType === OperationType.WRITE || operationType === OperationType.CREATE || operationType === OperationType.DELETE || operationType === OperationType.UPDATE) {
      alert(`Fehler: ${error instanceof Error ? error.message : String(error)}`);
    }
  };

  const handleLogin = async () => {
    console.log("Admin: Starting login process");
    setLoginError(null);
    setIsLoggingIn(true);
    try {
      const result = await loginWithGoogle();
      console.log("Admin: Login successful", result.user.email);
    } catch (err: any) {
      console.error("Admin: Login Error", err);
      if (err.code === 'auth/popup-closed-by-user') {
        setLoginError("Login wurde abgebrochen.");
      } else if (err.code === 'auth/popup-blocked') {
        setLoginError("Popup blockiert! Bitte erlaube Popups für diese Seite oder öffne sie in einem neuen Tab.");
      } else if (err.code === 'auth/internal-error') {
        setLoginError("Interner Fehler. Bitte versuche es später erneut.");
      } else if (err.code === 'auth/unauthorized-domain') {
        setLoginError("Domain nicht authorisiert. Bitte in Firebase Console prüfen.");
      } else {
        setLoginError(`Login fehlgeschlagen: ${err.code || err.message}`);
      }
    } finally {
      setIsLoggingIn(false);
    }
  };

  useEffect(() => {
    console.log("Admin: Initializing auth state listener");
    const unsubAuth = onAuthStateChanged(auth, (u) => {
      console.log("Admin: Auth state changed", u ? `User: ${u.email} (Verified: ${u.emailVerified})` : "No user");
      setUser(u);
      setLoading(false);
    });
    return () => unsubAuth();
  }, []);

  useEffect(() => {
    if (!user) return;
    const email = user.email?.toLowerCase() || "";
    const isAllowed = ADMIN_EMAILS.some(e => e.toLowerCase() === email);
    
    if (!isAllowed) {
      console.warn("User logged in but not in ADMIN_EMAILS list:", email);
      return;
    }

    console.log("Admin: Setting up listeners for allowed admin");
    const q = query(collection(db, "menu_items"), orderBy("category"));
    const unsubItems = onSnapshot(q, (snapshot) => {
      console.log("Admin: Items snapshot received", snapshot.size, "items");
      const mappedItems = snapshot.docs.map(doc => {
        const data = doc.data();
        // Log individual items to debug IDs
        console.log(`Doc: ${doc.id}`, data);
        return { ...data, id: doc.id };
      }) as MenuItem[];
      setItems(mappedItems);
    }, (err) => {
      handleFirestoreError(err, OperationType.GET, "menu_items");
    });

    const unsubSettings = onSnapshot(doc(db, "settings", "bakery"), (d) => {
      if (d.exists()) setSettings(d.data() as BakerySettings);
    }, (err) => {
      handleFirestoreError(err, OperationType.GET, "settings/bakery");
    });

    return () => {
      unsubItems();
      unsubSettings();
    };
  }, [user]);

  const handleAddItem = async () => {
    if (!newItem.name || !newItem.price || !newItem.category) return;
    const path = "menu_items";
    try {
      console.log("Admin: Adding item", newItem);
      await addDoc(collection(db, path), {
        name: newItem.name,
        price: newItem.price,
        category: newItem.category,
        order: items.length
      });
      console.log("Admin: Item added successfully (doc created)");
      setJustAddedItem(true);
      setTimeout(() => setJustAddedItem(false), 2000);
      setNewItem({ name: "", price: 0, category: "Kuchen" });
    } catch (err) {
      handleFirestoreError(err, OperationType.CREATE, path);
    }
  };

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editItem, setEditItem] = useState<Partial<MenuItem>>({});

  const startEditing = (item: MenuItem) => {
    setEditingId(item.id);
    setEditItem(item);
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditItem({});
  };

  const saveEdit = async () => {
    if (!editingId || !editItem.name) return;
    const path = `menu_items/${editingId}`;
    try {
      await updateDoc(doc(db, "menu_items", editingId), {
        name: editItem.name,
        price: editItem.price,
        category: editItem.category
      });
      setEditingId(null);
    } catch (err) {
      handleFirestoreError(err, OperationType.UPDATE, path);
    }
  };

  const [itemToDelete, setItemToDelete] = useState<string | null>(null);

  const handleDeleteItem = async (id: string) => {
    console.log("Delete request received for ID:", id);
    if (!id) {
      console.error("No ID provided for deletion!");
      return;
    }
    
    const path = `menu_items/${id}`;
    console.log(`Deleting document at path: ${path}`);
    try {
      await deleteDoc(doc(db, "menu_items", id));
      console.log("Deletion successful");
      setItemToDelete(null);
    } catch (err) {
      console.error("Deletion failed:", err);
      handleFirestoreError(err, OperationType.DELETE, path);
    }
  };

  const handleUpdateCakeOfDay = async (val: string) => {
    const path = "settings/bakery";
    try {
      await setDoc(doc(db, "settings", "bakery"), { 
        cakeOfTheDay: val,
        updatedAt: new Date().toISOString()
      }, { merge: true });
      setJustSavedCake(true);
      setTimeout(() => setJustSavedCake(false), 2000);
    } catch (err) {
      handleFirestoreError(err, OperationType.WRITE, path);
    }
  };

  if (loading) return (
    <div className="h-screen flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-white/10 border-t-[#ff3e00] rounded-full animate-spin"></div>
    </div>
  );

  const isAdmin = user && ADMIN_EMAILS.some(e => e.toLowerCase() === (user.email?.toLowerCase() || ""));

  if (!user || !isAdmin) {
    return (
      <div className="h-screen flex flex-col items-center justify-center px-6">
        <h1 className="text-xs uppercase tracking-[0.4em] mb-4 font-bold text-amber-500">Admin Access</h1>
        <h2 className="text-4xl font-black uppercase mb-12 serif italic">Anmelden</h2>
        
        <button 
          onClick={handleLogin}
          disabled={isLoggingIn}
          className="group relative bg-white text-black px-12 py-4 font-black uppercase tracking-widest hover:bg-amber-500 transition-all flex items-center gap-4 disabled:opacity-50"
        >
          {isLoggingIn ? (
            <div className="w-5 h-5 border-2 border-black/20 border-t-black rounded-full animate-spin"></div>
          ) : (
            <div className="w-5 h-5 rounded-full bg-black group-hover:scale-125 transition-transform"></div>
          )}
          {isLoggingIn ? "Wird geladen..." : "Login mit Google"}
        </button>

        {loginError && (
          <div className="flex flex-col items-center">
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 text-red-500 font-bold uppercase text-[10px] tracking-widest bg-red-500/10 px-4 py-2 border border-red-500/20 text-center"
            >
              {loginError}
            </motion.p>
            <p className="mt-4 text-white/40 text-[10px] uppercase tracking-widest text-center max-w-xs">
              Tipp: Falls das Problem weiterhin besteht, öffne die Seite <a href={window.location.href} target="_blank" rel="noopener noreferrer" className="text-amber-500 underline">hier in einem neuen Tab</a>.
            </p>
          </div>
        )}

        {user && !isAdmin && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-8 text-center"
          >
            <p className="text-red-500 font-bold uppercase text-xs tracking-widest mb-4">Keine Berechtigung</p>
            <p className="text-white/40 text-[10px] uppercase tracking-widest mb-6">Angemeldet als: {user.email}</p>
            <button 
              onClick={logout}
              className="text-white/60 hover:text-white transition-colors text-[10px] font-bold uppercase tracking-[0.2em] underline underline-offset-8 decoration-white/10"
            >
              Mit anderem Account anmelden
            </button>
          </motion.div>
        )}
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-32 px-6">
      <Helmet>
        <title>Bakery Admin | Einstellungen</title>
        <meta name="description" content="Verwalte die Backstube und aktualisiere den Cake of the Day." />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <div className="mb-20 border-b border-white/10 pb-8">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tighter serif italic text-center md:text-left break-words">BACKSTUBE <span className="text-amber-500">DASHBOARD</span></h1>
      </div>

      {/* Cake of the day */}
      <section className="mb-24">
        <h2 className="text-xs uppercase tracking-[0.4em] mb-6 font-bold text-amber-500">Highlight / Kuchen des Tages</h2>
        <div className="bg-white/5 p-8 border border-white/10 flex flex-col md:flex-row gap-6 items-end">
          <div className="flex-1 w-full">
            <label className="text-[10px] uppercase tracking-widest font-bold text-white/40 mb-2 block">Aktueller Favorit</label>
            <input 
              type="text" 
              value={settings.cakeOfTheDay || ""}
              onChange={(e) => setSettings({ ...settings, cakeOfTheDay: e.target.value })}
              className="w-full bg-black border-b border-white/20 p-4 font-bold text-2xl uppercase focus:border-amber-500 outline-none transition-colors serif italic"
              placeholder="Name des Kuchens..."
            />
          </div>
          <button 
            onClick={() => handleUpdateCakeOfDay(settings.cakeOfTheDay)}
            className={`bg-white text-black px-10 py-4 font-black uppercase tracking-widest transition-all w-full md:w-auto flex items-center justify-center gap-2 ${
              justSavedCake ? "bg-amber-500" : "hover:bg-amber-500"
            }`}
          >
            {justSavedCake ? (
              <>
                <Check size={20} />
                <span>Gespeichert</span>
              </>
            ) : (
              "Sichern"
            )}
          </button>
        </div>
      </section>

      {/* Price List Management */}
      <section>
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-xs uppercase tracking-[0.4em] mb-4 font-bold text-amber-500">Manage / Preisliste</h2>
            <h3 className="text-4xl font-black uppercase tracking-tighter serif italic text-white/90">DEINE KREATIONEN</h3>
          </div>
        </div>
        
        {/* Add New Item */}
        <div className="bg-white/5 p-10 border border-white/10 mb-20">
          <p className="text-[10px] uppercase tracking-[0.3em] font-black text-white/20 mb-8 border-b border-white/10 pb-4">Neues Produkt hinzufügen</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="flex flex-col gap-2">
              <label className="text-[10px] uppercase tracking-widest font-bold text-white/40">Name</label>
              <input 
                type="text" 
                value={newItem.name || ""}
                onChange={e => setNewItem({...newItem, name: e.target.value})}
                className="bg-transparent border-b border-white/20 p-2 font-bold uppercase outline-none focus:border-amber-500 transition-all serif italic text-xl text-white"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[10px] uppercase tracking-widest font-bold text-white/40">Preis (€)</label>
              <input 
                type="number" 
                value={newItem.price || ""}
                onChange={e => setNewItem({...newItem, price: parseFloat(e.target.value) || 0})}
                className="bg-transparent border-b border-white/20 p-2 font-bold uppercase outline-none focus:border-amber-500 transition-all serif italic text-xl text-white"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[10px] uppercase tracking-widest font-bold text-white/40">Kategorie</label>
              <select 
                value={newItem.category}
                onChange={e => setNewItem({...newItem, category: e.target.value})}
                className="bg-transparent border-b border-white/20 p-2 font-bold uppercase outline-none focus:border-amber-500 transition-all serif italic text-xl text-white appearance-none cursor-pointer"
              >
                <option value="Kuchen" className="bg-[#0a0a0a]">Kuchen</option>
                <option value="Muffins" className="bg-[#0a0a0a]">Muffins</option>
                <option value="Kekse" className="bg-[#0a0a0a]">Kekse</option>
                <option value="Pakete" className="bg-[#0a0a0a]">Pakete</option>
                <option value="Anderes" className="bg-[#0a0a0a]">Anderes</option>
              </select>
            </div>
            <div className="flex items-end">
              <button 
                onClick={handleAddItem}
                disabled={!newItem.name}
                className={`w-full py-4 font-black uppercase tracking-widest transition-all shadow-xl disabled:opacity-50 flex items-center justify-center gap-2 ${
                  justAddedItem ? "bg-amber-500 text-black" : "bg-white text-black hover:bg-amber-500"
                }`}
              >
                {justAddedItem ? (
                  <>
                    <Check size={20} />
                    <span>Hinzugefügt</span>
                  </>
                ) : (
                  "Hinzufügen"
                )}
              </button>
            </div>
          </div>
        </div>

        {/* List of Items */}
        <div className="space-y-6">
          {items.map(item => (
            <div key={item.id} className="group flex flex-col md:flex-row md:items-center justify-between p-8 bg-white/5 border border-white/5 hover:border-white/20 transition-all">
              {editingId === item.id ? (
                <div className="flex-1 grid md:grid-cols-4 gap-6 items-end">
                   <div className="flex flex-col gap-1">
                    <label className="text-[9px] uppercase tracking-widest font-bold text-white/30">Name</label>
                    <input 
                      type="text" 
                      value={editItem.name || ""}
                      onChange={e => setEditItem({...editItem, name: e.target.value})}
                      className="bg-white/5 border-b border-amber-500 p-2 font-bold uppercase outline-none text-white serif italic"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[9px] uppercase tracking-widest font-bold text-white/30">Preis</label>
                    <input 
                      type="number" 
                      value={editItem.price || ""}
                      onChange={e => setEditItem({...editItem, price: parseFloat(e.target.value) || 0})}
                      className="bg-white/5 border-b border-amber-500 p-2 font-bold uppercase outline-none text-white serif italic"
                    />
                  </div>
                  <div className="flex gap-2">
                    <button 
                      onClick={saveEdit} 
                      className="flex-1 bg-amber-500 text-black p-2 rounded flex justify-center items-center"
                    >
                      <Check size={18} />
                    </button>
                    <button onClick={cancelEditing} className="flex-1 bg-white/10 text-white p-2 rounded flex justify-center items-center"><X size={18} /></button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex gap-8 items-center">
                  <div className="flex flex-col gap-1">
                    <span className="text-[9px] uppercase tracking-widest font-black text-amber-500/60 font-sans">{item.category}</span>
                    <div className="flex flex-col sm:flex-row sm:gap-4 sm:items-center">
                      <span className="text-xl sm:text-2xl font-black uppercase serif italic break-words">{item.name}</span>
                      <span className="hidden sm:inline text-white/20">—</span>
                      <span className="font-bold text-amber-500 text-lg sm:text-xl serif italic">{item.price} €</span>
                    </div>
                  </div>
                  </div>
                  <div className="flex gap-4 mt-6 md:mt-0 relative z-20">
                    {itemToDelete === item.id ? (
                      <div className="flex items-center gap-2 bg-red-500/10 p-1 rounded-lg border border-red-500/20">
                        <span className="text-[10px] uppercase font-bold text-red-500 px-2 italic">Sicher?</span>
                        <button 
                          type="button"
                          onClick={(e) => { e.stopPropagation(); handleDeleteItem(item.id); }}
                          className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600 transition-colors"
                        >
                          <Trash size={16} />
                        </button>
                        <button 
                          type="button"
                          onClick={(e) => { e.stopPropagation(); setItemToDelete(null); }}
                          className="bg-white/10 text-white p-2 rounded-md hover:bg-white/20 transition-colors"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    ) : (
                      <>
                        <button 
                          type="button"
                          onClick={(e) => { e.stopPropagation(); startEditing(item); }}
                          className="text-white/40 hover:text-white transition-colors p-2"
                        >
                          <Edit3 size={18} />
                        </button>
                        <button 
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            console.log("Delete button clicked for ID:", item.id);
                            setItemToDelete(item.id);
                          }}
                          className="text-white/20 hover:text-red-500 transition-colors p-3 bg-white/5 hover:bg-red-500/10 rounded-full"
                          title="Löschen"
                        >
                          <Trash size={20} />
                        </button>
                      </>
                    )}
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </section>

      <div className="mt-24 pt-12 border-t border-white/10 flex justify-center">
        <button 
          onClick={logout} 
          className="flex items-center gap-3 px-8 py-4 hover:bg-red-500/10 hover:text-red-500 hover:border-red-500/50 transition-all uppercase text-xs font-black tracking-[0.3em] border border-white/10 bg-white/5 group"
        >
          <LogOut size={18} className="group-hover:translate-x-1 transition-transform" />
          Vom Dashboard Abmelden
        </button>
      </div>
    </div>
  );
}
