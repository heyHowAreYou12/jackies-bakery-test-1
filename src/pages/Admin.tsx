import { useState, useEffect } from "react";
import { auth, loginWithGoogle, logout, db } from "../lib/firebase";
import { onAuthStateChanged, User } from "firebase/auth";
import { collection, onSnapshot, doc, setDoc, addDoc, deleteDoc, updateDoc, query, orderBy } from "firebase/firestore";
import { MenuItem, BakerySettings } from "../types";
import { Save, Plus, Trash, LogOut, Check, X, Edit3, Star } from "lucide-react";
import { motion } from "motion/react";

const ADMIN_EMAILS = ["prokic.nico@gmail.com", "beispiel_email@gmail.com", "email@gmail.com"];

export default function Admin() {
  const [user, setUser] = useState<User | null>(null);
  const [items, setItems] = useState<MenuItem[]>([]);
  const [settings, setSettings] = useState<BakerySettings>({ cakeOfTheDay: "" });
  const [loading, setLoading] = useState(true);
  const [newItem, setNewItem] = useState<Partial<MenuItem>>({ name: "", price: 0, category: "Kuchen", imageUrl: "" });

  useEffect(() => {
    const unsubAuth = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
    });
    return () => unsubAuth();
  }, []);

  useEffect(() => {
    if (!user || !ADMIN_EMAILS.includes(user.email || "")) return;

    const q = query(collection(db, "menu_items"), orderBy("category"));
    const unsubItems = onSnapshot(q, (snapshot) => {
      setItems(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as MenuItem[]);
    });

    const unsubSettings = onSnapshot(doc(db, "settings", "bakery"), (d) => {
      if (d.exists()) setSettings(d.data() as BakerySettings);
    });

    return () => {
      unsubItems();
      unsubSettings();
    };
  }, [user]);

  const handleAddItem = async () => {
    if (!newItem.name || !newItem.price || !newItem.category) return;
    try {
      await addDoc(collection(db, "menu_items"), {
        name: newItem.name,
        price: newItem.price,
        category: newItem.category,
        imageUrl: newItem.imageUrl || "",
        order: items.length
      });
      setNewItem({ name: "", price: 0, category: "Kuchen", imageUrl: "" });
    } catch (err) {
      console.error(err);
    }
  };

  const seedInitialData = async () => {
    const initialItems = [
      { name: "Bananenkuchen", price: 8, category: "Kuchen", imageUrl: "https://images.unsplash.com/photo-1544070078-a212eda27b49?q=80&w=2670&auto=format&fit=crop" },
      { name: "Apfel-Zimt Muffin", price: 3.5, category: "Muffins", imageUrl: "https://images.unsplash.com/photo-1550617931-e17a7b70dce2?q=80&w=2670&auto=format&fit=crop" },
      { name: "Paket 5 Muffins", price: 12, category: "Pakete", imageUrl: "https://images.unsplash.com/photo-1587536849034-ad1f37df992c?q=80&w=2574&auto=format&fit=crop" },
      { name: "Schokotorte", price: 14, category: "Kuchen", imageUrl: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=2689&auto=format&fit=crop" }
    ];

    if (confirm("Katalog mit Beispieldaten befüllen?")) {
      for (const item of initialItems) {
        await addDoc(collection(db, "menu_items"), { ...item, order: 0 });
      }
      alert("Erfolgreich hinzugefügt!");
    }
  };

  const handleDeleteItem = async (id: string) => {
    if (confirm("Wirklich löschen?")) {
      await deleteDoc(doc(db, "menu_items", id));
    }
  };

  const handleUpdateCakeOfDay = async (val: string) => {
    await setDoc(doc(db, "settings", "bakery"), { 
      cakeOfTheDay: val,
      updatedAt: new Date().toISOString()
    }, { merge: true });
  };

  if (loading) return (
    <div className="h-screen flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-white/10 border-t-[#ff3e00] rounded-full animate-spin"></div>
    </div>
  );

  if (!user || !ADMIN_EMAILS.includes(user.email || "")) {
    return (
      <div className="h-screen flex flex-col items-center justify-center px-6">
        <h1 className="text-4xl font-black uppercase mb-8">Admin Access</h1>
        <button 
          onClick={loginWithGoogle}
          className="bg-white text-black px-8 py-4 font-black uppercase tracking-widest hover:bg-[#ff3e00] hover:text-white transition-all flex items-center gap-4"
        >
          Login mit Google
        </button>
        {user && !ADMIN_EMAILS.includes(user.email || "") && (
          <p className="mt-4 text-[#ff3e00] font-bold uppercase text-xs">Keine Berechtigung mit {user.email}</p>
        )}
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-32 px-6">
      <div className="flex justify-between items-center mb-20 border-b border-white/10 pb-8">
        <h1 className="text-6xl font-black uppercase tracking-tighter">BACKSTUBE <span className="text-[#ff3e00]">DASHBOARD</span></h1>
        <div className="flex gap-4">
          <button 
            onClick={seedInitialData}
            className="text-[10px] font-black uppercase tracking-widest border border-white/20 px-4 py-2 hover:bg-white hover:text-black transition-all"
          >
            Reset Catalog
          </button>
          <button onClick={logout} className="p-4 hover:text-[#ff3e00] transition-colors"><LogOut /></button>
        </div>
      </div>

      {/* Cake of the day */}
      <section className="mb-20 bg-white/5 p-8 border border-white/10">
        <h2 className="text-2xl font-black uppercase mb-6 flex items-center gap-3">
          <Star className="text-[#ff3e00]" /> Cake of the Day
        </h2>
        <div className="flex gap-4">
          <input 
            type="text" 
            value={settings.cakeOfTheDay || ""}
            onChange={(e) => setSettings({ ...settings, cakeOfTheDay: e.target.value })}
            className="flex-1 bg-black border border-white/10 p-4 font-bold uppercase focus:border-[#ff3e00] outline-none"
            placeholder="Name des Kuchens..."
          />
          <button 
            onClick={() => handleUpdateCakeOfDay(settings.cakeOfTheDay)}
            className="bg-[#ff3e00] px-8 font-black uppercase"
          >
            Update
          </button>
        </div>
      </section>

      {/* Price List Management */}
      <section>
        <h2 className="text-2xl font-black uppercase mb-8 flex items-center gap-3">
          <Plus className="text-[#ff3e00]" /> Preisliste verwalten
        </h2>
        
        {/* Add New Item */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-12 bg-white/5 p-6 border border-white/10">
          <input 
            type="text" 
            placeholder="Name" 
            value={newItem.name || ""}
            onChange={e => setNewItem({...newItem, name: e.target.value})}
            className="bg-black border border-white/10 p-3 font-bold uppercase outline-none focus:border-[#ff3e00]"
          />
          <input 
            type="number" 
            placeholder="Preis (€)" 
            value={newItem.price || ""}
            onChange={e => setNewItem({...newItem, price: parseFloat(e.target.value) || 0})}
            className="bg-black border border-white/10 p-3 font-bold uppercase outline-none focus:border-[#ff3e00]"
          />
          <input 
            type="text" 
            placeholder="Bild URL (optional)" 
            value={newItem.imageUrl || ""}
            onChange={e => setNewItem({...newItem, imageUrl: e.target.value})}
            className="bg-black border border-white/10 p-3 font-bold uppercase outline-none focus:border-[#ff3e00]"
          />
          <select 
            value={newItem.category}
            onChange={e => setNewItem({...newItem, category: e.target.value})}
            className="bg-black border border-white/10 p-3 font-bold uppercase outline-none focus:border-[#ff3e00]"
          >
            <option value="Kuchen">Kuchen</option>
            <option value="Muffins">Muffins</option>
            <option value="Kekse">Kekse</option>
            <option value="Pakete">Pakete</option>
            <option value="Anderes">Anderes</option>
          </select>
          <button 
            onClick={handleAddItem}
            className="bg-white text-black py-3 md:py-0 font-black uppercase tracking-widest hover:bg-[#ff3e00] hover:text-white transition-all h-full"
          >
            Add
          </button>
        </div>

        {/* List of Items */}
        <div className="space-y-4">
          {items.map(item => (
            <div key={item.id} className="flex items-center justify-between p-6 bg-white/5 border border-white/5 group hover:border-white/20 transition-all">
              <div className="flex gap-6 items-center">
                {item.imageUrl && (
                  <img src={item.imageUrl} className="w-12 h-12 object-cover grayscale" />
                )}
                <div className="flex gap-4 items-center">
                  <span className="text-[10px] bg-white/10 px-2 py-1 uppercase font-black">{item.category}</span>
                  <span className="text-xl font-bold uppercase">{item.name}</span>
                  <span className="text-white/40">—</span>
                  <span className="font-black text-[#ff3e00]">{item.price} €</span>
                </div>
              </div>
              <button 
                onClick={() => handleDeleteItem(item.id)}
                className="text-white/20 group-hover:text-red-500 transition-colors"
              >
                <Trash className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
