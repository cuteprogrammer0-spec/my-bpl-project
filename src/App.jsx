import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import productsData from './data/products.json'; 

const UserIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
  </svg>
);

function App() {
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  const handleAddToCart = (product) => {
    const exists = cartItems.find(item => item.id === product.id);
    if (!exists) {
      setCartItems([...cartItems, product]);
      toast.success(`${product.name} added to cart!`);
    } else {
      toast.warning("Already added to cart!");
    }
  };

  const handleRemoveItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
    toast.error("Removed from cart");
  };

  const handleCheckout = () => {
    setCartItems([]);
    toast.info("Checkout successful! Cart cleared.");
  };

  const isInCart = (id) => cartItems.some(item => item.id === id);

  return (
    <div className="min-h-screen bg-white">
      <ToastContainer position="top-right" autoClose={1500} />
      
      {/* Navbar Section */}
      <nav className="navbar bg-white px-6 md:px-10 border-b border-gray-100 sticky top-0 z-50">
        <div className="flex-1">
          <a className="text-3xl font-extrabold text-violet-600">Digi<span className='font-normal'>Tools</span></a>
        </div>
        <div className="hidden md:flex flex-none gap-6 text-gray-700 font-medium items-center">
          <a className="hover:text-violet-600 cursor-pointer">Product</a>
          <a className="hover:text-violet-600 cursor-pointer">Feature</a>
          <a className="hover:text-violet-600 cursor-pointer">Pricing</a>
          <div className="indicator ml-4">
            <span className="indicator-item badge bg-violet-600 text-white border-none text-xs">{cartItems.length}</span>
            <button className="btn btn-ghost btn-circle">🛒</button>
          </div>
          <button className="btn bg-violet-600 hover:bg-violet-700 text-white border-none rounded-xl px-8 ml-4">Sign Up</button>
        </div>
      </nav>
      
      {!showCart && (
        <>
          {/* Hero Section */}
          <section className="container mx-auto px-6 md:px-10 py-20 flex flex-col md:flex-row items-center gap-10">
            <div className="md:w-1/2 space-y-6">
              <span className="text-sm font-bold text-violet-600 bg-violet-50 px-4 py-2 rounded-full inline-block">Explore & Purchase premium templates</span>
              <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight">Supercharge Your Digital Workflow</h1>
              <p className="text-gray-500 text-lg">Provide premium mockups, design assets, and templates quickly with easy use platforms.</p>
              <div className="flex gap-4">
                <button className="btn bg-violet-600 hover:bg-violet-700 text-white border-none rounded-xl px-8 h-14">Purchase Products</button>
                <button className="btn btn-outline border-violet-600 text-violet-600 hover:bg-violet-600 hover:text-white rounded-xl px-8 h-14">Watch Demo</button>
              </div>
            </div>
            <div className="md:w-1/2">
              <img src="https://i.ibb.co/30BfXFq/hero-image.png" alt="Banner" className="w-full rounded-3xl" />
            </div>
          </section>

          {/* Stats Section */}
          <section className="bg-violet-600 py-12 text-white my-10">
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-white/20 md:divide-x">
              <div><h3 className="text-4xl font-bold">50K+</h3><p className="opacity-80">Active Users</p></div>
              <div><h3 className="text-4xl font-bold">200+</h3><p className="opacity-80">Premium Tools</p></div>
              <div><h3 className="text-4xl font-bold">4.9</h3><p className="opacity-80">Rating</p></div>
            </div>
          </section>
        </>
      )}

      {/* Main Content Area */}
      <div className="text-center my-16 space-y-4">
        {!showCart && (
          <>
            <h2 className="text-4xl font-bold text-gray-900">Premium Digital Tools</h2>
            <p className="text-gray-500 max-w-xl mx-auto px-6">Explore our curated collection of professional tools.</p>
          </>
        )}
        <div className="flex justify-center gap-4 mt-8">
          <button onClick={() => setShowCart(false)} className={`btn rounded-xl px-8 ${!showCart ? 'bg-violet-600 text-white border-none' : 'btn-outline border-violet-600 text-violet-600'}`}>Products</button>
          <button onClick={() => setShowCart(true)} className={`btn rounded-xl px-8 ${showCart ? 'bg-violet-600 text-white border-none' : 'btn-outline border-violet-600 text-violet-600'}`}>Cart ({cartItems.length})</button>
        </div>
      </div>

      <main className="container mx-auto px-6 md:px-10 pb-20">
        {!showCart ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {productsData.map(p => {
              const inCart = isInCart(p.id);
              return (
                <div key={p.id} className="card bg-white border border-gray-100 shadow-sm hover:shadow-xl transition-all rounded-3xl p-8">
                   <div className="flex justify-between items-start mb-6">
                      <span className="text-5xl">{p.icon}</span>
                      <span className="badge bg-orange-100 text-orange-600 border-none font-bold text-xs p-3">{p.tagType}</span>
                   </div>
                   <h3 className="text-2xl font-bold text-gray-900 mb-2">{p.name}</h3>
                   <p className="text-gray-500 text-sm mb-6">{p.description}</p>
                   <div className="border-y py-4 mb-6">
                      <p className="text-4xl font-black text-gray-900">${p.price}<span className="text-sm font-normal text-gray-400"> / {p.period}</span></p>
                   </div>
                   <ul className="space-y-3 mb-8">
                      {p.features.map((f, i) => <li key={i} className="text-gray-600 flex items-center gap-2">✅ {f}</li>)}
                   </ul>
                   <button onClick={() => handleAddToCart(p)} className={`btn btn-block rounded-xl h-14 border-none text-white ${inCart ? 'bg-green-500' : 'bg-violet-600 hover:bg-violet-700'}`}>
                     {inCart ? '✔ Added to Cart' : 'Buy Now'}
                   </button>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="max-w-2xl mx-auto bg-gray-50 p-8 rounded-3xl border border-gray-100">
             <h2 className="text-3xl font-bold mb-8 text-gray-900">Your Selected Items</h2>
             {cartItems.length === 0 ? (
               <p className="text-center py-10 text-gray-400 italic">Your cart is empty.</p>
             ) : (
               <div className="space-y-4">
                  {cartItems.map(item => (
                    <div key={item.id} className="flex items-center justify-between bg-white p-4 rounded-2xl shadow-sm">
                       <div className="flex items-center gap-4">
                          <span className="text-3xl">{item.icon}</span>
                          <div><h4 className="font-bold">{item.name}</h4><p className="text-violet-600 font-bold">${item.price}</p></div>
                       </div>
                       <button onClick={() => handleRemoveItem(item.id)} className="btn btn-ghost btn-circle text-red-500">🗑️</button>
                    </div>
                  ))}
                  <div className="mt-10 border-t pt-6 space-y-4">
                     <div className="flex justify-between text-xl font-bold text-gray-900">
                        <span>Total Items: {cartItems.length}</span>
                        <span>Total: ${cartItems.reduce((a, b) => a + b.price, 0)}</span>
                     </div>
                     <button onClick={handleCheckout} className="btn bg-green-500 hover:bg-green-600 text-white btn-block h-14 border-none rounded-xl">Proceed to Checkout</button>
                  </div>
               </div>
             )}
          </div>
        )}
      </main>

      <footer className="footer footer-center p-12 bg-gray-900 text-white rounded-t-3xl">
        <aside className="max-w-xl">
          <a className="text-4xl font-extrabold">Digi<span className="font-normal opacity-70">Tools</span></a>
          <p className="mt-4 opacity-70 italic text-sm">Empowering your digital creative journey with premium tools.</p>
        </aside>
        <div className="border-t border-white/10 w-full mt-6 pt-6">
          <p className="text-sm opacity-50 text-center">Copyright © 2026 - All right reserved by DigiTools Industries</p>
        </div>
      </footer>
    </div>
  );
}

export default App;