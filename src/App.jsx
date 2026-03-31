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
      <nav className="navbar bg-white px-6 md:px-10 border-b border-gray-100 sticky top-0 z-50 relative">
        <div className="flex-1 mr-[400px] absolute">
          <a className="text-3xl font-extrabold text-violet-600">Digi<span className='font-bold'>Tools</span></a>
        </div>
        <div className="hidden md:flex flex-none gap-6 text-gray-700 font-medium items-center ml-[380px] absolute">
          <a className="hover:text-violet-600 cursor-pointer">Product</a>
          <a className="hover:text-violet-600 cursor-pointer">Feature</a>
          <a className="hover:text-violet-600 cursor-pointer">Pricing</a>
          <div className="indicator ml-4">
            <div className='absolute ml-[150px]'>
            <span className="indicator-item badge  text-red-600 border-none text-xs ">{cartItems.length}</span>
            <button className="btn btn-ghost btn-circle xs">🛒</button>
          </div>
          <button className="btn bg-violet-600 hover:bg-violet-700 text-white border-none rounded-xl px-8 ml-4 ml-[250px]">Get started</button>
            </div>
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
                <button className="btn btn-outline border-violet-600 text-violet-600 hover:bg-violet-600 hover:text-white rounded-xl px-8 h-14"><i className="fa-solid fa-arrow-right"></i>Watch Demo</button>
              </div>
            </div>
            <div className="md:w-1/2">
              <img src='./src/assets/banner.png' />
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
            <p className="text-gray-500 ">Choose from our curated collection of premium digital products designedto boost your productivity and creativity.</p>
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
                      <img src={p.icon} alt={p.name} className="w-14 h-14 object-contain" />
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


<section className="bg-slate-50 py-20 px-4">
  <div className="max-w-7xl mx-auto">
    
    {/* Section Header */}
    <div className="text-center mb-16 relative">
      <h2 className="text-4xl md:text-5xl font-extrabold text-gray-950 mb-4 ">
        Get Started In 3 Steps
      </h2>
      <p className="text-lg text-gray-600  text-center">
        Start using premium digital tools in minutes, not hours.
      </p>
    </div>

    {/* Steps Cards Grid */}
    <div className="grid md:grid-cols-3 gap-8">
      
      {/* Step 1 Card */}
      <div className="bg-white p-10 rounded-3xl border border-gray-100 shadow-sm relative text-center">
        {/* Step Number Tag */}
        <div className="absolute top-6 right-6 bg-violet-600 text-white font-bold text-xs w-8 h-8 flex items-center justify-center rounded-lg shadow-sm">
          01
        </div>
        
<div className="w-24 h-24 bg-violet-100 rounded-full flex items-center justify-center mx-auto mb-8 border border-violet-200">
  <img 
    src="./src/assets/user.png" 
    alt="User Icon" 
    className="w-16 h-16 object-contain" 
  />
</div>
        
        <h3 className="text-2xl font-bold text-gray-950 mb-3">Create Account</h3>
        
        <p className="text-gray-600">
          Sign up for free in seconds. No credit card required to get started.
        </p>
      </div>

      <div className="bg-white p-10 rounded-3xl border border-gray-100 shadow-sm relative text-center">
        <div className="absolute top-6 right-6 bg-violet-600 text-white font-bold text-xs w-8 h-8 flex items-center justify-center rounded-lg shadow-sm">
          02
        </div>
        
       <div className="w-24 h-24 bg-violet-100 rounded-full flex items-center justify-center mx-auto mb-8 border border-violet-200">
  <img 
    src="./src/assets/package.png" 
    alt="User Icon" 
    className="w-16 h-16 object-contain" 
  />
</div>
      
        <h3 className="text-2xl font-bold text-gray-950 mb-3">Choose Products</h3>
        <p className="text-gray-600">
          Browse our catalog and select the tools that fit your needs.
        </p>
      </div>

      <div className="bg-white p-10 rounded-3xl border border-gray-100 shadow-sm relative text-center">
        <div className="absolute top-6 right-6 bg-violet-600 text-white font-bold text-xs w-8 h-8 flex items-center justify-center rounded-lg shadow-sm">
          03
        </div>
        
        <div className="w-24 h-24 bg-violet-100 rounded-full flex items-center justify-center mx-auto mb-8 border border-violet-200">
  <img 
    src="./src/assets/rocket.png" 
    alt="User Icon" 
    className="w-16 h-16 object-contain" 
  />
</div>
        
        
        <h3 className="text-2xl font-bold text-gray-950 mb-3">Start Creating</h3>
        
      
        <p className="text-gray-600">
          Download and start using your premium tools immediately.
        </p>
      </div>

    </div>
  </div>
</section>


<section className="bg-gray-50 py-20 px-6">
  <div className="max-w-7xl mx-auto">
    
    <div className="text-center mb-16">
      <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-5">
        Simple, Transparent Pricing
      </h2>
      <p className="text-gray-500 text-lg">
        Choose the plan that fits your needs. Upgrade or downgrade anytime.
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
      
      <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-all">
        <h3 className="text-2xl font-bold text-slate-800 mb-2">Starter</h3>
        <div className="flex items-baseline mb-8">
          <span className="text-4xl font-bold text-slate-900">$0</span>
          <span className="text-gray-400 ml-1">/Month</span>
        </div>
        <ul className="space-y-4 mb-10 text-gray-600">
          <li className="flex items-center gap-2"><i className="fa-solid fa-check text-green-500"></i> Basic access</li>
          <li className="flex items-center gap-2"><i className="fa-solid fa-check text-green-500"></i> Community support</li>
        </ul>
        <button className="w-full py-4 rounded-2xl bg-violet-600 text-white font-bold">Get Started</button>
      </div>

      <div className="bg-violet-600 p-8 rounded-3xl shadow-xl relative md:scale-105 border-4 border-violet-500 text-white">
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-orange-100 text-orange-600 py-1 px-4 rounded-full text-xs font-bold">Most Popular</div>
        <h3 className="text-2xl font-bold mb-2">Pro</h3>
        <div className="flex items-baseline mb-8 text-white">
          <span className="text-4xl font-bold">$29</span>
          <span className="ml-1">/Month</span>
        </div>
        <ul className="space-y-4 mb-10">
          <li className="flex items-center gap-2"><i className="fa-solid fa-check"></i> Unlimited tools</li>
          <li className="flex items-center gap-2"><i className="fa-solid fa-check"></i> Priority support</li>
        </ul>
        <button className="w-full py-4 rounded-2xl bg-white text-violet-600 font-bold">Start Trial</button>
      </div>

      <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-all">
        <h3 className="text-2xl font-bold text-slate-800 mb-2">Enterprise</h3>
        <div className="flex items-baseline mb-8">
          <span className="text-4xl font-bold text-slate-900">$99</span>
          <span className="text-gray-400 ml-1">/Month</span>
        </div>
        <ul className="space-y-4 mb-10 text-gray-600">
          <li className="flex items-center gap-2"><i className="fa-solid fa-check text-green-500"></i> Full Customization</li>
          <li className="flex items-center gap-2"><i className="fa-solid fa-check text-green-500"></i> Dedicated Support</li>
        </ul>
        <button className="w-full py-4 rounded-2xl bg-violet-600 text-white font-bold">Contact Us</button>
      </div>

    </div>
  </div>
</section>





      {/* --- Footer Section Start --- */}
<footer className="bg-[#0b1224] text-white py-16 px-6">
  <div className="max-w-7xl mx-auto">
    

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 pb-16">
      
      <div className="lg:col-span-2">
        <h2 className="text-3xl font-bold mb-6">DigiTools</h2>
        <p className="text-gray-400 max-w-xs leading-relaxed text-sm">
          Premium digital tools for creators, professionals, and businesses. 
          Work smarter with our suite of powerful tools.
        </p>
      </div>

      <div>
        <h4 className="font-semibold text-lg mb-6">Product</h4>
        <ul className="space-y-4 text-gray-400 text-sm">
          <li><a href="#" className="hover:text-white transition">Features</a></li>
          <li><a href="#" className="hover:text-white transition">Pricing</a></li>
          <li><a href="#" className="hover:text-white transition">Templates</a></li>
          <li><a href="#" className="hover:text-white transition">Integrations</a></li>
        </ul>
      </div>

      <div>
        <h4 className="font-semibold text-lg mb-6">Company</h4>
        <ul className="space-y-4 text-gray-400 text-sm">
          <li><a href="#" className="hover:text-white transition">About</a></li>
          <li><a href="#" className="hover:text-white transition">Blog</a></li>
          <li><a href="#" className="hover:text-white transition">Careers</a></li>
          <li><a href="#" className="hover:text-white transition">Press</a></li>
        </ul>
      </div>

      <div>
        <h4 className="font-semibold text-lg mb-6">Resources</h4>
        <ul className="space-y-4 text-gray-400 text-sm mb-8">
          <li><a href="#" className="hover:text-white transition">Documentation</a></li>
          <li><a href="#" className="hover:text-white transition">Help Center</a></li>
          <li><a href="#" className="hover:text-white transition">Community</a></li>
          <li><a href="#" className="hover:text-white transition">Contact</a></li>
        </ul>
      </div>
    </div>

    <div className="flex flex-col md:flex-row justify-end items-start md:items-center gap-4 mb-10">
        <span className="font-bold text-sm">Social Links</span>
        <div className="flex gap-3">
            <a href="#" className="w-9 h-9 bg-white text-black rounded-full flex items-center justify-center hover:bg-gray-200 transition">
                <i className="fa-brands fa-instagram"></i>
            </a>
            <a href="#" className="w-9 h-9 bg-white text-black rounded-full flex items-center justify-center hover:bg-gray-200 transition">
                <i className="fa-brands fa-facebook-f"></i>
            </a>
            <a href="#" className="w-9 h-9 bg-white text-black rounded-full flex items-center justify-center hover:bg-gray-200 transition">
                <i className="fa-brands fa-x-twitter"></i>
            </a>
        </div>
    </div>

    <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-6">
      <p className="text-gray-500 text-sm">
        © 2026 Digitools. All rights reserved.
      </p>
      <div className="flex gap-8 text-gray-500 text-sm">
        <a href="#" className="hover:text-white">Privacy Policy</a>
        <a href="#" className="hover:text-white">Terms of Service</a>
        <a href="#" className="hover:text-white">Cookies</a>
      </div>
    </div>

  </div>
</footer>

    </div>
  );
}

export default App;