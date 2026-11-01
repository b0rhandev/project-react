import { useEffect, useMemo, useState } from 'react'
import vaseImage from './pexels-photo-7663201.jpg'
import plateImage from './pexels-photo-30259432.jpg'
import candleImage from './pexels-photo-6798396.jpg'
import bowlImage from './pexels-photo-29312155.jpg'
import secondVaseImage from './pexels-photo-19193216.jpg'
import lampImage from './pexels-photo-31410610.jpg'
import throwImage from './pexels-photo-31658575.jpg'
import trayImage from './pexels-photo-7675064.jpg'
import diffuserImage from './pexels-photo-7795656.jpg'
import basketImage from './pexels-photo-10117739.jpg'
import jarImage from './kitchen-design-home-decoration.jpg'
import storyHomeImage from '../pexels-photo-30861337.jpg'
import storyCraftImage from '../pexels-photo-34230986.jpg'
import storyTableImage from '../pexels-photo-7180275.jpg'
import storyDecorImage from '../pexels-photo-5482202.jpg'
import storyScentImage from '../pexels-photo-7795650.jpg'
import storyArtistsImage from '../pexels-photo.jpg'

// ۱. لیست محصولات با لینک‌های عکسِ سالم و تست‌شده
const products = [
  { id: 'mug', name: 'ماگ دست‌ساز آوید', category: 'ظروف', price: 680000, oldPrice: 820000, tag: 'پرفروش', color: 'ماسه‌ای', image: '' },
  { id: 'vase', name: 'گلدان سرامیکی رها', category: 'دکور', price: 1240000, tag: 'جدید', color: 'سفید شیری', image: vaseImage },
  { id: 'plate', name: 'بشقاب دست‌ساز ماهور', category: 'ظروف', price: 890000, color: 'آبی اقیانوسی', image: plateImage },
  { id: 'candle', name: 'شمع معطر جنگل', category: 'خانه و عطر', price: 540000, tag: 'محبوب', color: 'سبز زیتونی', image: candleImage },
  { id: 'bowl', name: 'کاسه سرامیکی نیلا', category: 'ظروف', price: 760000, color: 'خاکی', image: bowlImage },
  { id: 'vase-2', name: 'گلدان مینیمال آبان', category: 'دکور', price: 1580000, tag: 'محدود', color: 'سفید مات', image: secondVaseImage },
  { id: 'lamp', name: 'چراغ رومیزی سپیدار', category: 'روشنایی', price: 2150000, tag: 'جدید', color: 'چوب طبیعی', image: lampImage },
  { id: 'throw', name: 'شال مبل بافت باران', category: 'بافت و پارچه', price: 1890000, color: 'کرم گرم', image: throwImage },
  { id: 'tray', name: 'سینی چوبی نارون', category: 'میز و پذیرایی', price: 980000, color: 'گردویی', image: trayImage },
  { id: 'diffuser', name: 'دیفیوزر رایحه‌ی صبح', category: 'خانه و عطر', price: 720000, tag: 'محبوب', color: 'مرکبات و چوب', image: diffuserImage },
  { id: 'basket', name: 'سبد بافت دست‌ساز', category: 'بافت و پارچه', price: 1120000, color: 'الیاف طبیعی', image: basketImage },
  { id: 'jar', name: 'ظرف نگهدارنده‌ی آوا', category: 'میز و پذیرایی', price: 640000, color: 'خاک رس', image: jarImage },
]

const categories = ['همه محصولات', ...new Set(products.map((product) => product.category))]

const stories = [
  { image: storyHomeImage, title: 'چطور با چند تغییر کوچک، خانه را آرام‌تر کنیم؟', meta: 'سبک زندگی · ۵ دقیقه' },
  { image: storyCraftImage, title: 'پشت هر قطعه‌ی دست‌ساز، یک جفت دستِ مهربان', meta: 'دست‌ساز · ۳ دقیقه' },
  { image: storyTableImage, title: 'یک میز ساده؛ بهانه‌ای برای کنار هم بودن', meta: 'خانه‌داری · ۴ دقیقه' },
  { image: storyDecorImage, title: 'چیزهایی که خانه را به خانه تبدیل می‌کنند', meta: 'الهام · ۶ دقیقه' },
  { image: storyScentImage, title: 'عطر خانه؛ انتخاب رایحه‌ای که حال تو را خوب می‌کند', meta: 'خانه‌داری · ۴ دقیقه' },
  { image: storyArtistsImage, title: 'قصه‌ی کوتاه هنرمندانی که با دست می‌سازند', meta: 'آدم‌ها · ۷ دقیقه' },
]

// توابع کمکی برای ساخت لینک عکس و فرمت کردن قیمت به فارسی
const imageUrl = (url) => url
const formatPrice = (price) => `${new Intl.NumberFormat('fa-IR').format(price)} تومان`

// ۲. کامپوننت هوشمند عکس (اگر اینترنت کاربر عکس را باز نکرد، طرح جایگزین شیک نشان می‌دهد)
function SafeImage({ src, alt, className = '' }) {
  const [hasError, setHasError] = useState(false)

  if (hasError) {
    return (
      <div className={`flex flex-col items-center justify-center bg-stone-200 p-4 text-center text-stone-500 dark:bg-stone-800 dark:text-stone-400 ${className}`}>
        <Icon name="leaf" size={28} />
        <span className="mt-2 text-xs font-medium">{alt}</span>
        <small className="mt-1 text-[10px] opacity-75">خانه‌زاد · دست‌ساز</small>
      </div>
    )
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      loading="lazy"
      onError={() => setHasError(true)}
    />
  )
}

// ۳. کامپوننت آیکون‌ها (با قابلیت توپُر شدن برای آیکون قلب)
function Icon({ name, size = 20, filled = false }) {
  const paths = {
    search: <><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /></>,
    bag: <><path d="M5 8h14l1 13H4L5 8Z" /><path d="M9 9V6a3 3 0 0 1 6 0v3" /></>,
    heart: <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z" />,
    arrow: <><path d="M19 12H5" /><path d="m12 19-7-7 7-7" /></>,
    close: <><path d="m18 6-12 12" /><path d="m6 6 12 12" /></>,
    menu: <><path d="M4 7h16" /><path d="M4 12h16" /><path d="M4 17h16" /></>,
    plus: <><path d="M12 5v14" /><path d="M5 12h14" /></>,
    minus: <path d="M5 12h14" />,
    instagram: <><rect width="20" height="20" x="2" y="2" rx="5" /><circle cx="12" cy="12" r="4" /><path d="M17.5 6.5h.01" /></>,
    pin: <><path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></>,
    check: <path d="m5 12 4 4L19 6" />,
    sun: <><circle cx="12" cy="12" r="4" /><path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42" /></>,
    moon: <path d="M20.9 13A9 9 0 0 1 11 3.1 9 9 0 1 0 20.9 13Z" />,
    leaf: <><path d="M11 20A7 7 0 0 1 4 13c0-6 8-9 16-9 0 8-3 16-9 16Z" /><path d="M8 16c2-3 5-5 9-7" /></>,
  }

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={filled ? 'currentColor' : 'none'}
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  )
}

function Eyebrow({ children, className = '' }) {
  return (
    <span className={`inline-flex items-center gap-2 text-xs font-medium tracking-wide text-stone-500 dark:text-stone-400 ${className}`}>
      <i className="size-1.5 rounded-full bg-lime-700 dark:bg-lime-400" />
      {children}
    </span>
  )
}

function SectionHeading({ eyebrow, children, action }) {
  return (
    <div className="mb-7 flex items-end justify-between gap-4">
      <div>
        <Eyebrow>{eyebrow}</Eyebrow>
        <h2 className="mt-2 text-3xl font-light tracking-tight sm:text-4xl">{children}</h2>
      </div>
      {action}
    </div>
  )
}

// ۴. کارت نمایش هر محصول
function ProductCard({ product, favorite, onFavorite, onAdd }) {
  return (
    <article className="group min-w-0">
      <div className="relative aspect-[4/4.7] overflow-hidden rounded-sm bg-stone-200 dark:bg-stone-800">
        <a href={`#product/${product.id}`} aria-label={`مشاهده ${product.name}`}>
          <SafeImage
            className="size-full object-cover transition duration-700 group-hover:scale-105"
            src={imageUrl(product.image)}
            alt={product.name}
          />
        </a>

        {product.tag && (
          <span className="absolute right-3 top-3 rounded-full bg-stone-50/90 px-3 py-1 text-[11px] font-medium text-stone-700 dark:bg-stone-900/90 dark:text-stone-200">
            {product.tag}
          </span>
        )}

        <button
          className={`absolute left-3 top-3 grid size-9 place-items-center rounded-full bg-stone-50/90 transition hover:text-rose-600 dark:bg-stone-900/90 ${favorite ? 'text-rose-600' : 'text-stone-700 dark:text-stone-200'
            }`}
          onClick={() => onFavorite(product.id)}
          aria-label="افزودن به علاقه‌مندی‌ها"
        >
          <Icon name="heart" size={17} filled={favorite} />
        </button>

        <button
          className="absolute inset-x-3 bottom-3 flex min-h-10 translate-y-2 items-center justify-center gap-2 rounded-sm bg-stone-950/90 text-xs text-white opacity-0 transition duration-300 hover:bg-green-900 group-hover:translate-y-0 group-hover:opacity-100 focus:translate-y-0 focus:opacity-100 max-sm:translate-y-0 max-sm:opacity-100"
          onClick={() => onAdd(product.id)}
        >
          <Icon name="plus" size={15} /> افزودن به سبد
        </button>
      </div>

      <div className="pt-3">
        <span className="text-[11px] text-stone-500 dark:text-stone-400">
          {product.category} <span className="mx-1 text-stone-300">·</span> {product.color}
        </span>
        <a
          href={`#product/${product.id}`}
          className="mt-1 block text-sm font-medium hover:text-green-800 dark:hover:text-lime-300"
        >
          {product.name}
        </a>
        <div className="mt-1.5 flex items-center gap-2">
          <strong className="text-xs font-semibold">{formatPrice(product.price)}</strong>
          {product.oldPrice && (
            <del className="text-[11px] text-stone-400">{formatPrice(product.oldPrice)}</del>
          )}
        </div>
      </div>
    </article>
  )
}

function ProductGrid({ items, favorites, onFavorite, onAdd }) {
  if (!items.length) {
    return (
      <div className="col-span-full flex min-h-72 flex-col items-center justify-center text-center">
        <span className="text-4xl text-green-800 dark:text-lime-300">♡</span>
        <h3 className="mt-3 text-xl font-medium">هنوز چیزی اینجا نیست</h3>
        <p className="mt-2 text-xs text-stone-500 dark:text-stone-400">
          محصول موردنظرت را در میان همه‌ی محصولات پیدا کن.
        </p>
        <a
          className="mt-5 inline-flex items-center gap-3 bg-stone-900 px-5 py-3 text-xs text-white dark:bg-lime-100 dark:text-stone-900"
          href="#shop"
        >
          رفتن به فروشگاه <Icon name="arrow" size={15} />
        </a>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 gap-x-3 gap-y-7 sm:grid-cols-3 sm:gap-x-5 lg:grid-cols-4">
      {items.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          favorite={favorites.includes(product.id)}
          onFavorite={onFavorite}
          onAdd={onAdd}
        />
      ))}
    </div>
  )
}

// ۵. کامپوننت اصلی برنامه
function App() {
  const [route, setRoute] = useState(window.location.hash.slice(1) || 'home')

  // ذخیره سبد خرید و علاقه‌مندی‌ها در حافظه مرورگر تا با رفرش نپرند
  const [cart, setCart] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('khanehzad-cart')) || {}
    } catch {
      return {}
    }
  })
  const [favorites, setFavorites] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('khanehzad-favs')) || []
    } catch {
      return []
    }
  })

  const [category, setCategory] = useState('همه محصولات')
  const [sort, setSort] = useState('featured')
  const [search, setSearch] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem('khanehzad-theme') === 'dark')
  const [toast, setToast] = useState('')
  const [newsletterDone, setNewsletterDone] = useState(false)
  const [detailQuantity, setDetailQuantity] = useState(1)
  const [contactSent, setContactSent] = useState(false)

  // مدیریت تغییر صفحات با Hash
  useEffect(() => {
    const handleHash = () => {
      const nextRoute = window.location.hash.slice(1) || 'home'
      setRoute(nextRoute)
      setDetailQuantity(1)
      setContactSent(false)
      if (nextRoute === 'favorites') setCategory('همه محصولات')
      setMenuOpen(false)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
    window.addEventListener('hashchange', handleHash)
    return () => window.removeEventListener('hashchange', handleHash)
  }, [])

  // ذخیره تغییرات در LocalStorage
  useEffect(() => {
    localStorage.setItem('khanehzad-theme', darkMode ? 'dark' : 'light')
    document.documentElement.classList.toggle('dark', darkMode)
  }, [darkMode])

  useEffect(() => {
    localStorage.setItem('khanehzad-cart', JSON.stringify(cart))
  }, [cart])

  useEffect(() => {
    localStorage.setItem('khanehzad-favs', JSON.stringify(favorites))
  }, [favorites])

  // بستن خودکار پیغامِ نوتیفیکیشن (Toast)
  useEffect(() => {
    if (!toast) return undefined
    const timer = window.setTimeout(() => setToast(''), 2600)
    return () => window.clearTimeout(timer)
  }, [toast])

  // محاسبات سبد خرید و فیلتر محصولات
  const cartCount = Object.values(cart).reduce((sum, quantity) => sum + quantity, 0)
  const cartTotal = Object.entries(cart).reduce(
    (sum, [id, quantity]) => sum + (products.find((item) => item.id === id)?.price || 0) * quantity,
    0
  )
  const selectedProduct = route.startsWith('product/')
    ? products.find((item) => item.id === route.split('/')[1])
    : null

  const visibleProducts = useMemo(() => {
    let result = products.filter(
      (item) =>
        (category === 'همه محصولات' || item.category === category) &&
        `${item.name} ${item.category} ${item.color}`.includes(search.trim()) &&
        (!route.startsWith('favorites') || favorites.includes(item.id))
    )
    if (sort === 'price-low') result = [...result].sort((a, b) => a.price - b.price)
    if (sort === 'price-high') result = [...result].sort((a, b) => b.price - a.price)
    return result
  }, [category, favorites, route, search, sort])

  function addToCart(id, quantity = 1) {
    setCart((current) => ({ ...current, [id]: (current[id] || 0) + quantity }))
    setToast('با موفقیت به سبد خرید اضافه شد')
  }

  function changeQuantity(id, amount) {
    setCart((current) => {
      const quantity = (current[id] || 0) + amount
      const next = { ...current }
      if (quantity <= 0) delete next[id]
      else next[id] = quantity
      return next
    })
  }

  function toggleFavorite(id) {
    setFavorites((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id]
    )
  }

  function handleSearchChange(event) {
    const val = event.target.value
    setSearch(val)
    if (val.trim() && !['shop', 'favorites'].includes(route)) {
      window.location.hash = 'shop'
    }
  }

  function submitSearch(event) {
    event.preventDefault()
    setCategory('همه محصولات')
    window.location.hash = 'shop'
  }

  // هدر سایت
  const header = (
    <>
      <div className="bg-green-950 px-4 py-2 text-center text-xs text-green-50 dark:bg-black">
        ارسال رایگان برای سفارش‌های بالای ۲ میلیون تومان <span className="mx-2 text-lime-300">✳</span> با عشق، از کارگاه ما تا خانه‌ی شما
      </div>
      <header className="relative z-30 mx-auto flex h-[76px] w-[calc(100%-32px)] max-w-7xl items-center justify-between border-b border-stone-200 dark:border-stone-800 sm:h-[86px] sm:w-[calc(100%-64px)]">
        <button
          className="inline-flex p-2 md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="باز کردن منو"
        >
          <Icon name={menuOpen ? 'close' : 'menu'} />
        </button>

        <a
          className="mr-2 flex items-center gap-2.5 text-lg font-bold tracking-tight sm:text-xl"
          href="#home"
          aria-label="خانه‌زاد، صفحه اصلی"
        >
          <span className="grid size-9 place-items-center rounded-full bg-green-900 text-lg font-medium text-white dark:bg-lime-200 dark:text-green-950">
            خ
          </span>
          <span className="flex flex-col leading-tight">
            خانه‌زاد
            <small className="mt-1 text-[10px] font-normal tracking-normal text-stone-500 dark:text-stone-400">
              خانه‌ای با قصه‌ی تو
            </small>
          </span>
        </a>

        <nav
          className={`${menuOpen ? 'flex' : 'hidden'
            } absolute inset-x-0 top-full flex-col border-b border-stone-200 bg-stone-50 px-5 py-3 shadow-lg dark:border-stone-800 dark:bg-stone-950 md:static md:flex md:h-full md:flex-row md:items-center md:gap-8 md:border-0 md:bg-transparent md:p-0 md:shadow-none`}
        >
          {[
            ['خانه', 'home'],
            ['فروشگاه', 'shop'],
            ['داستان ما', 'about'],
            ['مجله خانه', 'journal'],
            ['تماس', 'contact'],
          ].map(([label, target]) => (
            <a
              key={target}
              className={`py-3 text-xs transition hover:text-green-800 dark:hover:text-lime-300 md:py-0 ${route === target
                  ? 'font-semibold text-green-900 dark:text-lime-300'
                  : 'text-stone-600 dark:text-stone-300'
                }`}
              href={`#${target}`}
            >
              {label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-4">
          <form
            className="hidden h-9 w-40 items-center border-b border-stone-300 dark:border-stone-700 lg:flex"
            onSubmit={submitSearch}
          >
            <input
              className="w-full bg-transparent text-xs outline-none placeholder:text-stone-400"
              aria-label="جست‌وجو"
              placeholder="جست‌وجو..."
              value={search}
              onChange={handleSearchChange}
            />
            <button aria-label="جست‌وجو">
              <Icon name="search" size={18} />
            </button>
          </form>

          <button
            className="grid size-9 place-items-center rounded-full transition hover:bg-stone-100 dark:hover:bg-stone-800"
            onClick={() => setDarkMode(!darkMode)}
            aria-label={darkMode ? 'فعال کردن تم روشن' : 'فعال کردن تم تیره'}
            title={darkMode ? 'تم روشن' : 'تم تیره'}
          >
            <Icon name={darkMode ? 'sun' : 'moon'} size={18} />
          </button>

          <a
            className="relative grid size-9 place-items-center rounded-full transition hover:bg-stone-100 dark:hover:bg-stone-800 max-sm:hidden"
            href="#favorites"
            aria-label="علاقه‌مندی‌ها"
          >
            <Icon name="heart" size={19} filled={favorites.length > 0} />
            <span className="absolute left-0 top-0 grid min-w-4 place-items-center rounded-full bg-green-800 px-1 text-[10px] text-white dark:bg-lime-300 dark:text-stone-900">
              {favorites.length}
            </span>
          </a>

          <a
            className="relative grid size-9 place-items-center rounded-full transition hover:bg-stone-100 dark:hover:bg-stone-800"
            href="#cart"
            aria-label="سبد خرید"
          >
            <Icon name="bag" size={19} />
            <span className="absolute left-0 top-0 grid min-w-4 place-items-center rounded-full bg-green-800 px-1 text-[10px] text-white dark:bg-lime-300 dark:text-stone-900">
              {cartCount}
            </span>
          </a>
        </div>
      </header>
    </>
  )

  // فوتر سایت
  const footer = (
    <footer className="bg-stone-900 text-stone-100 dark:bg-black">
      <div className="mx-auto grid w-[calc(100%-40px)] max-w-7xl gap-9 py-12 sm:w-[calc(100%-64px)] sm:grid-cols-2 lg:grid-cols-[1.3fr_.8fr_.9fr_1.2fr] lg:gap-12 lg:py-16">
        <div>
          <a className="flex items-center gap-2.5 text-lg font-bold" href="#home">
            <span className="grid size-9 place-items-center rounded-full bg-lime-100 text-green-950">خ</span>
            خانه‌زاد
          </a>
          <p className="mt-4 max-w-60 text-xs leading-7 text-stone-400">
            چیزهایی برای خانه، که فقط زیبا نیستند؛ حالِ خوب می‌آورند.
          </p>
          <a
            className="mt-3 inline-flex items-center gap-2 text-xs text-lime-100"
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            aria-label="اینستاگرام"
          >
            <Icon name="instagram" size={18} /> khanehzad.studio
          </a>
        </div>

        <div className="flex flex-col items-start gap-3 text-xs text-stone-400">
          <h3 className="mb-1 text-sm font-medium text-stone-100">دسترسی سریع</h3>
          <a href="#shop" className="hover:text-white">همه محصولات</a>
          <a href="#about" className="hover:text-white">داستان خانه‌زاد</a>
          <a href="#journal" className="hover:text-white">مجله خانه</a>
          <a href="#contact" className="hover:text-white">تماس با ما</a>
        </div>

        <div className="flex flex-col items-start gap-3 text-xs text-stone-400">
          <h3 className="mb-1 text-sm font-medium text-stone-100">راهنمای خرید</h3>
          <a href="#contact" className="hover:text-white">روش‌های ارسال</a>
          <a href="#contact" className="hover:text-white">شرایط بازگشت</a>
          <a href="#contact" className="hover:text-white">پرسش‌های متداول</a>
          <a href="#contact" className="hover:text-white">پیگیری سفارش</a>
        </div>

        <div>
          <h3 className="text-sm font-medium">نامه‌ای از خانه‌زاد</h3>
          <p className="mt-2 text-xs leading-6 text-stone-400">از تازه‌ها و قصه‌های خانه باخبر شو.</p>
          <form
            className="mt-3 flex max-w-64 border-b border-stone-600"
            onSubmit={(event) => {
              event.preventDefault()
              setNewsletterDone(true)
            }}
          >
            <input
              className="w-full bg-transparent py-2 text-xs outline-none placeholder:text-stone-500"
              type="email"
              placeholder="ایمیل تو"
              aria-label="ایمیل"
              required
            />
            <button className="px-2 text-lime-100" aria-label="ثبت ایمیل">
              <Icon name="arrow" size={18} />
            </button>
          </form>
          {newsletterDone && (
            <span className="mt-3 flex items-center gap-1 text-xs text-lime-200">
              <Icon name="check" size={15} /> به جمع ما خوش آمدی!
            </span>
          )}
        </div>
      </div>

      <div className="mx-auto flex w-[calc(100%-40px)] max-w-7xl flex-col items-center justify-between gap-2 border-t border-stone-700 py-4 text-center text-xs text-stone-400 sm:w-[calc(100%-64px)] sm:flex-row">
        <span>© ۱۴۰۵ خانه‌زاد. تمام حقوق محفوظ است.</span>
        <span>
          با دست ساخته شده، با دل انتخاب شده <span className="text-rose-300">♥</span>
        </span>
      </div>
    </footer>
  )

  // صفحه اصلی (Home)
  function renderHome() {
    return (
      <main>
        <section className="mx-auto grid max-w-7xl items-center gap-9 px-5 py-7 sm:px-8 lg:min-h-[590px] lg:grid-cols-[.9fr_1.1fr] lg:gap-16 lg:py-12">
          <div className="order-2 py-4 lg:order-1">
            <Eyebrow>خانه، از همین جزئیات شروع می‌شود</Eyebrow>
            <h1 className="mt-5 text-5xl font-light leading-[1.35] tracking-tight sm:text-6xl lg:text-7xl">
              برای خانه‌ای
              <br />
              که <em className="not-italic text-green-800 dark:text-lime-300">شبیه توست.</em>
            </h1>
            <p className="mt-4 max-w-md text-sm leading-8 text-stone-600 dark:text-stone-300">
              چیزهای کوچک و دست‌سازی که روزهای معمولی را کمی قشنگ‌تر می‌کنند. با حوصله ساخته شده‌اند، برای سال‌ها ماندن.
            </p>
            <div className="mt-6 flex items-center gap-6">
              <a
                className="inline-flex min-h-12 items-center gap-4 bg-stone-900 px-6 text-xs font-medium text-white transition hover:bg-green-900 dark:bg-lime-100 dark:text-stone-950 dark:hover:bg-lime-200"
                href="#shop"
              >
                کشف مجموعه <Icon name="arrow" size={17} />
              </a>
              <a
                className="text-xs font-medium text-stone-600 hover:text-green-800 dark:text-stone-300 dark:hover:text-lime-300"
                href="#about"
              >
                قصه‌ی خانه‌زاد ←
              </a>
            </div>
            <div className="mt-8 flex items-center gap-3">
              <span className="flex -space-x-2.5 [direction:ltr]">
                <i className="grid size-8 place-items-center rounded-full border-2 border-stone-50 bg-lime-100 text-xs not-italic text-stone-800 dark:border-stone-950">م</i>
                <i className="grid size-8 place-items-center rounded-full border-2 border-stone-50 bg-orange-100 text-xs not-italic text-stone-800 dark:border-stone-950">ن</i>
                <i className="grid size-8 place-items-center rounded-full border-2 border-stone-50 bg-teal-100 text-xs not-italic text-stone-800 dark:border-stone-950">ر</i>
              </span>
              <span className="flex flex-col gap-1 text-xs">
                <strong>بیش از ۲٬۴۰۰ خانه</strong>
                <small className="text-stone-500 dark:text-stone-400">با انتخاب‌های ما گرم‌تر شدند</small>
              </span>
            </div>
          </div>

          <div className="relative order-1 h-[min(105vw,480px)] lg:order-2 lg:h-[510px]">
            <div className="absolute -left-3 -top-3 h-4/5 w-3/4 bg-stone-200 dark:bg-stone-800" />
            <SafeImage
              className="relative size-full object-cover"
              src={imageUrl('https://images.pexels.com/photos/6615908/pexels-photo-6615908.jpeg?auto=compress&cs=tinysrgb&w=1400', 1400)}
              alt="فضای گرم و آرام خانه با دکور دست‌ساز"
            />
            <div className="absolute inset-x-3 bottom-3 flex flex-col gap-1 bg-stone-950/75 px-4 py-3 text-white sm:inset-x-5 sm:bottom-5">
              <span className="text-[11px] text-stone-300">01 — مجموعه‌ی زندگی آرام</span>
              <b className="text-xs font-medium">چیزهای ساده، حس‌های عمیق</b>
            </div>
            <div className="absolute -left-3 top-7 grid size-20 rotate-[-10deg] place-items-center rounded-full bg-green-800 text-center text-[11px] leading-5 text-white shadow-xl dark:bg-lime-200 dark:text-green-950 sm:-left-6">
              ساخته‌شده
              <br />
              با عشق ✳
            </div>
          </div>
        </section>

        <section className="mx-auto grid w-[calc(100%-40px)] max-w-6xl divide-y divide-stone-200 border-y border-stone-200 py-3 dark:divide-stone-800 dark:border-stone-800 sm:w-[calc(100%-64px)] sm:grid-cols-3 sm:divide-y-0">
          {[
            ['✳', 'دست‌ساز و منحصربه‌فرد', 'هر قطعه، قصه‌ی خودش را دارد'],
            ['⌂', 'ساخته‌شده برای ماندن', 'انتخاب آگاهانه، کیفیت ماندگار'],
            ['♡', 'ارسال با عشق', 'بسته‌بندی امن و دوست‌داشتنی'],
          ].map(([icon, title, caption]) => (
            <div
              key={title}
              className="flex items-center gap-3 px-3 py-3 sm:justify-center sm:border-l sm:border-stone-200 sm:py-4 sm:last:border-0 dark:sm:border-stone-800"
            >
              <span className="grid size-10 place-items-center rounded-full border border-lime-800/20 text-lg text-green-800 dark:border-lime-200/20 dark:text-lime-300">
                {icon}
              </span>
              <p className="m-0 flex flex-col gap-1">
                <strong className="text-xs">{title}</strong>
                <small className="text-[11px] text-stone-500 dark:text-stone-400">{caption}</small>
              </p>
            </div>
          ))}
        </section>

        <section className="mx-auto w-[calc(100%-40px)] max-w-6xl py-16 sm:w-[calc(100%-64px)] sm:py-24">
          <SectionHeading
            eyebrow="انتخاب‌هایی از کارگاه ما"
            action={
              <a className="mb-1 text-xs text-green-900 dark:text-lime-300" href="#shop">
                دیدن همه محصولات ←
              </a>
            }
          >
            تازه‌های <em className="not-italic text-green-800 dark:text-lime-300">خانه‌زاد</em>
          </SectionHeading>
          <ProductGrid
            items={products.slice(0, 4)}
            favorites={favorites}
            onFavorite={toggleFavorite}
            onAdd={addToCart}
          />
        </section>

        <section className="bg-stone-100 py-14 dark:bg-stone-900 sm:py-20">
          <div className="mx-auto w-[calc(100%-40px)] max-w-6xl sm:w-[calc(100%-64px)]">
            <SectionHeading eyebrow="برای هر گوشه‌ی خانه">
              از کجا <em className="not-italic text-green-800 dark:text-lime-300">شروع کنیم؟</em>
            </SectionHeading>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-5">
              {[
                ['ظروف', 'برای دورهمی‌های طولانی', 'https://images.pexels.com/photos/29312155/pexels-photo-29312155.jpeg?auto=compress&cs=tinysrgb&w=1000'],
                ['دکور', 'جزئیاتِ دوست‌داشتنی', 'https://images.pexels.com/photos/5482202/pexels-photo-5482202.jpeg?auto=compress&cs=tinysrgb&w=1000'],
                ['خانه و عطر', 'نفس عمیق، خانه‌ی آرام', 'https://images.pexels.com/photos/7795656/pexels-photo-7795656.jpeg?auto=compress&cs=tinysrgb&w=1000'],
                ['روشنایی', 'نوری برای گوشه‌ی دنج', 'https://images.pexels.com/photos/31410610/pexels-photo-31410610.jpeg?auto=compress&cs=tinysrgb&w=1000'],
                ['بافت و پارچه', 'لطافتِ لحظه‌های خانه', 'https://images.pexels.com/photos/31658575/pexels-photo-31658575.jpeg?auto=compress&cs=tinysrgb&w=1000'],
                ['میز و پذیرایی', 'برای باهم بودن', 'https://images.pexels.com/photos/7675064/pexels-photo-7675064.jpeg?auto=compress&cs=tinysrgb&w=1000'],
              ].map(([name, caption, image]) => (
                <a
                  key={name}
                  href="#shop"
                  onClick={() => setCategory(name)}
                  className={`group relative h-52 overflow-hidden bg-stone-300 sm:h-64 ${name === 'خانه و عطر' ? 'col-span-2 sm:col-span-1' : ''
                    }`}
                >
                  <SafeImage
                    className="size-full object-cover transition duration-700 group-hover:scale-105"
                    src={imageUrl(image, 800)}
                    alt={name}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent" />
                  <div className="absolute inset-x-4 bottom-4 text-white sm:inset-x-5 sm:bottom-5">
                    <small className="text-[11px] text-stone-200">{caption}</small>
                    <strong className="mt-1 block text-base font-medium sm:text-lg">{name}</strong>
                    <span className="mt-2 block text-xs">کشف مجموعه ←</span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className="grid bg-lime-50 dark:bg-stone-900 md:grid-cols-2">
          <div className="h-64 md:h-[420px]">
            <SafeImage
              className="size-full object-cover"
              src={imageUrl('https://images.pexels.com/photos/34259428/pexels-photo-34259428.jpeg?auto=compress&cs=tinysrgb&w=1000', 1000)}
              alt="دست‌های هنرمند در کارگاه"
            />
          </div>
          <div className="relative flex flex-col items-start justify-center px-7 py-12 sm:px-14 lg:px-20">
            <Eyebrow>قصه‌ی ما، از یک میز کوچک شروع شد</Eyebrow>
            <h2 className="mt-4 max-w-lg text-3xl font-light leading-relaxed tracking-tight sm:text-4xl">
              ما به چیزهایی باور داریم که <em className="not-italic text-green-800 dark:text-lime-300">آرام می‌مانند.</em>
            </h2>
            <p className="mt-3 max-w-lg text-xs leading-7 text-stone-600 dark:text-stone-300">
              خانه‌زاد از یک سؤال شروع شد: اگر چیزهای خانه را فقط برای پر کردن فضا نخریم، چه می‌شود؟ حالا ما و هنرمندان کوچک‌مان، با دست‌های خودمان، جواب این سؤال را می‌سازیم.
            </p>
            <a
              className="mt-5 inline-flex min-h-11 items-center gap-3 border border-green-900/30 px-5 text-xs transition hover:bg-green-900 hover:text-white dark:border-lime-100/30 dark:hover:bg-lime-100 dark:hover:text-stone-950"
              href="#about"
            >
              بیشتر درباره‌ی ما <Icon name="arrow" size={16} />
            </a>
          </div>
        </section>

        <section className="mx-auto w-[calc(100%-40px)] max-w-6xl py-16 sm:w-[calc(100%-64px)] sm:py-24">
          <SectionHeading
            eyebrow="کمی مکث، کمی الهام"
            action={
              <a className="mb-1 text-xs text-green-900 dark:text-lime-300" href="#journal">
                همه‌ی نوشته‌ها ←
              </a>
            }
          >
            مجله‌ی <em className="not-italic text-green-800 dark:text-lime-300">خانه</em>
          </SectionHeading>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {stories.slice(0, 3).map((story) => (
              <a className="group" href="#journal" key={story.title}>
                <SafeImage
                  className="aspect-[1.55] w-full object-cover transition duration-500 group-hover:brightness-90"
                  src={imageUrl(story.image, 700)}
                  alt={story.title}
                />
                <span className="mt-3 block text-[11px] text-stone-500 dark:text-stone-400">{story.meta}</span>
                <h3 className="mt-2 text-sm font-medium leading-7">{story.title}</h3>
                <span className="mt-1 block text-xs text-green-800 dark:text-lime-300">ادامه‌ی مطلب ←</span>
              </a>
            ))}
          </div>
        </section>

        <section className="mx-auto mb-16 w-[calc(100%-40px)] max-w-6xl overflow-hidden bg-green-950 px-6 py-10 text-green-50 dark:bg-green-950 sm:w-[calc(100%-64px)] sm:px-12 sm:py-12">
          <div className="flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-center">
            <div>
              <Eyebrow className="text-lime-200">لحظه‌های کوچک، خانه‌ی گرم</Eyebrow>
              <h2 className="mt-2 text-2xl font-light sm:text-3xl">یک چیز خوب برای گوشه‌ی خانه‌ات پیدا کن.</h2>
            </div>
            <a
              className="inline-flex min-h-11 shrink-0 items-center gap-3 bg-lime-100 px-5 text-xs font-medium text-green-950 transition hover:bg-white"
              href="#shop"
            >
              دیدن همه‌ی محصولات <Icon name="arrow" size={16} />
            </a>
          </div>
        </section>
      </main>
    )
  }

  // صفحه فروشگاه (Shop & Favorites)
  function renderShop(title = 'همه‌ی محصولات') {
    return (
      <main className="min-h-[60vh]">
        <section className="flex flex-col items-center bg-stone-100 px-5 py-12 text-center dark:bg-stone-900 sm:py-16">
          <Eyebrow>با دقت انتخاب شده، با عشق ساخته شده</Eyebrow>
          <h1 className="mt-3 text-4xl font-light tracking-tight sm:text-5xl">{title}</h1>
          <p className="mt-3 text-xs text-stone-600 dark:text-stone-300">
            چیزهایی که خانه را کمی بیشتر شبیه خودت می‌کنند.
          </p>
          <div className="mt-4 flex gap-2 text-xs text-stone-500">
            <a href="#home">خانه</a>
            <span>/</span>
            <span className="text-stone-800 dark:text-stone-200">فروشگاه</span>
          </div>
        </section>

        <section className="mx-auto w-[calc(100%-40px)] max-w-6xl py-7 pb-16 sm:w-[calc(100%-64px)] sm:py-10 sm:pb-24">
          <div className="mb-6 flex flex-col justify-between gap-3 border-b border-stone-200 dark:border-stone-800 sm:flex-row sm:items-center">
            <div className="flex gap-5 overflow-x-auto">
              {categories.map((item) => (
                <button
                  key={item}
                  className={`shrink-0 border-b-2 py-3 text-xs transition ${category === item
                      ? 'border-green-800 font-semibold text-green-900 dark:border-lime-300 dark:text-lime-300'
                      : 'border-transparent text-stone-500 hover:text-stone-900 dark:text-stone-400 dark:hover:text-white'
                    }`}
                  onClick={() => setCategory(item)}
                >
                  {item}
                </button>
              ))}
            </div>
            <div className="flex items-center justify-between gap-4 pb-2 sm:pb-0">
              <span className="text-xs text-stone-500 dark:text-stone-400">{visibleProducts.length} محصول</span>
              <select
                className="max-w-48 bg-transparent p-2 text-xs outline-none dark:bg-stone-950"
                value={sort}
                onChange={(event) => setSort(event.target.value)}
                aria-label="مرتب‌سازی"
              >
                <option value="featured">مرتب‌سازی: پیشنهادی</option>
                <option value="price-low">قیمت: کم به زیاد</option>
                <option value="price-high">قیمت: زیاد به کم</option>
              </select>
            </div>
          </div>

          <ProductGrid
            items={visibleProducts}
            favorites={favorites}
            onFavorite={toggleFavorite}
            onAdd={addToCart}
          />
        </section>
      </main>
    )
  }

  // صفحه جزئیات محصول (Product Detail)
  function renderProduct() {
    if (!selectedProduct) {
      return (
        <main className="flex min-h-96 flex-col items-center justify-center">
          <h2 className="text-2xl">این محصول پیدا نشد</h2>
          <a
            href="#shop"
            className="mt-5 bg-stone-900 px-5 py-3 text-xs text-white dark:bg-lime-100 dark:text-stone-950"
          >
            بازگشت به فروشگاه
          </a>
        </main>
      )
    }

    const isFav = favorites.includes(selectedProduct.id)

    return (
      <main className="min-h-[60vh]">
        <section className="mx-auto grid w-[calc(100%-40px)] max-w-6xl gap-8 py-8 pb-14 sm:w-[calc(100%-64px)] sm:py-14 lg:grid-cols-2 lg:gap-16">
          <div className="h-[min(105vw,560px)] overflow-hidden bg-stone-200 dark:bg-stone-800">
            <SafeImage
              className="size-full object-cover"
              src={imageUrl(selectedProduct.image, 1200)}
              alt={selectedProduct.name}
            />
          </div>

          <div className="pt-2">
            <div className="mb-8 flex gap-2 text-xs text-stone-500">
              <a href="#home">خانه</a>
              <span>/</span>
              <a href="#shop">فروشگاه</a>
              <span>/</span>
              <span>{selectedProduct.name}</span>
            </div>
            <Eyebrow>{selectedProduct.category} · دست‌ساز</Eyebrow>
            <h1 className="mt-3 text-3xl font-medium">{selectedProduct.name}</h1>
            <p className="mt-3 text-base font-semibold">{formatPrice(selectedProduct.price)}</p>
            <p className="mt-5 text-xs leading-8 text-stone-600 dark:text-stone-300">
              این قطعه با دست و با حوصله ساخته شده؛ برای لحظه‌های ساده‌ای که دوست داریم کمی بیشتر در خاطر بمانند. هر محصول به‌خاطر ساخت دست، شخصیت و تفاوت ظریف خودش را دارد.
            </p>

            <div className="my-5 flex items-center gap-3 border-y border-stone-200 py-4 text-xs dark:border-stone-800">
              <span className="text-stone-500">رنگ</span>
              <strong className="font-medium">{selectedProduct.color}</strong>
              <i className="size-4 rounded-full border border-stone-300 bg-amber-100 dark:border-stone-600" />
            </div>

            <div className="flex gap-2">
              <div className="flex min-h-12 items-center gap-3 border border-stone-200 px-2 dark:border-stone-700">
                <button
                  className="grid size-7 place-items-center"
                  onClick={() => setDetailQuantity(Math.max(1, detailQuantity - 1))}
                  aria-label="کم کردن"
                >
                  <Icon name="minus" size={15} />
                </button>
                <span className="min-w-4 text-center text-xs">
                  {new Intl.NumberFormat('fa-IR').format(detailQuantity)}
                </span>
                <button
                  className="grid size-7 place-items-center"
                  onClick={() => setDetailQuantity(detailQuantity + 1)}
                  aria-label="زیاد کردن"
                >
                  <Icon name="plus" size={15} />
                </button>
              </div>

              <button
                className="flex min-h-12 flex-1 items-center justify-center gap-3 bg-stone-900 text-xs text-white transition hover:bg-green-900 dark:bg-lime-100 dark:text-stone-950 dark:hover:bg-lime-200"
                onClick={() => addToCart(selectedProduct.id, detailQuantity)}
              >
                افزودن به سبد خرید <Icon name="bag" size={17} />
              </button>

              <button
                className={`grid size-12 place-items-center border border-stone-200 transition hover:text-rose-600 dark:border-stone-700 ${isFav ? 'text-rose-600' : ''
                  }`}
                onClick={() => toggleFavorite(selectedProduct.id)}
                aria-label="علاقه‌مندی"
              >
                <Icon name="heart" filled={isFav} />
              </button>
            </div>

            <div className="mt-7 space-y-3 border-t border-stone-200 pt-5 text-xs text-stone-600 dark:border-stone-800 dark:text-stone-300">
              <p className="flex items-center gap-2">
                <Icon name="check" size={16} /> بسته‌بندی امن و ارسال سریع
              </p>
              <p className="flex items-center gap-2">
                <Icon name="check" size={16} /> ساخته‌شده با مواد اولیه‌ی باکیفیت
              </p>
              <p className="flex items-center gap-2">
                <Icon name="check" size={16} /> امکان بازگشت تا ۷ روز
              </p>
            </div>
          </div>
        </section>

        <section className="mx-auto w-[calc(100%-40px)] max-w-6xl pb-16 sm:w-[calc(100%-64px)]">
          <SectionHeading eyebrow="شاید این‌ها هم دوست داشته باشی">
            انتخاب‌های <em className="not-italic text-green-800 dark:text-lime-300">دیگر</em>
          </SectionHeading>
          <ProductGrid
            items={products.filter((item) => item.id !== selectedProduct.id).slice(0, 4)}
            favorites={favorites}
            onFavorite={toggleFavorite}
            onAdd={addToCart}
          />
        </section>
      </main>
    )
  }

  // صفحه سبد خرید (Cart)
  function renderCart() {
    const items = Object.entries(cart)
      .map(([id, quantity]) => ({
        product: products.find((item) => item.id === id),
        quantity,
      }))
      .filter((item) => item.product)

    return (
      <main className="min-h-[60vh]">
        <section className="flex flex-col items-center bg-stone-100 px-5 py-10 text-center dark:bg-stone-900">
          <Eyebrow>چیزهای دوست‌داشتنی تو</Eyebrow>
          <h1 className="mt-2 text-4xl font-light">
            سبد <em className="not-italic text-green-800 dark:text-lime-300">خرید</em>
          </h1>
          <div className="mt-3 flex gap-2 text-xs text-stone-500">
            <a href="#home">خانه</a>
            <span>/</span>
            <span>سبد خرید</span>
          </div>
        </section>

        <section className="mx-auto grid w-[calc(100%-40px)] max-w-6xl gap-8 py-8 pb-16 sm:w-[calc(100%-64px)] lg:grid-cols-[1fr_320px] lg:gap-12">
          {items.length ? (
            <>
              <div>
                <div className="hidden grid-cols-[1fr_120px_120px_130px] gap-3 border-b border-stone-200 pb-3 text-xs text-stone-500 dark:border-stone-800 sm:grid">
                  <span>محصول</span>
                  <span>قیمت</span>
                  <span>تعداد</span>
                  <span>جمع</span>
                </div>
                {items.map(({ product, quantity }) => (
                  <div
                    key={product.id}
                    className="grid min-h-24 grid-cols-[1fr_auto] items-center gap-3 border-b border-stone-200 py-3 text-xs dark:border-stone-800 sm:grid-cols-[1fr_120px_120px_130px]"
                  >
                    <a className="flex items-center gap-3" href={`#product/${product.id}`}>
                      <SafeImage
                        className="size-16 object-cover sm:h-[74px] sm:w-16"
                        src={imageUrl(product.image, 220)}
                        alt={product.name}
                      />
                      <span className="flex flex-col gap-1">
                        <strong className="font-medium">{product.name}</strong>
                        <small className="text-stone-500 dark:text-stone-400">{product.color}</small>
                      </span>
                    </a>
                    <span className="hidden text-xs text-stone-600 dark:text-stone-300 sm:block">
                      {formatPrice(product.price)}
                    </span>
                    <div className="flex w-fit items-center gap-2 border border-stone-200 px-1 dark:border-stone-700">
                      <button
                        className="grid size-7 place-items-center"
                        onClick={() => changeQuantity(product.id, -1)}
                        aria-label="کم کردن"
                      >
                        <Icon name="minus" size={13} />
                      </button>
                      <span>{new Intl.NumberFormat('fa-IR').format(quantity)}</span>
                      <button
                        className="grid size-7 place-items-center"
                        onClick={() => changeQuantity(product.id, 1)}
                        aria-label="زیاد کردن"
                      >
                        <Icon name="plus" size={13} />
                      </button>
                    </div>
                    <strong className="font-medium">{formatPrice(product.price * quantity)}</strong>
                  </div>
                ))}
                <a className="mt-5 inline-block text-xs text-green-800 dark:text-lime-300" href="#shop">
                  ← ادامه‌ی خرید
                </a>
              </div>

              <aside className="h-fit bg-stone-100 p-5 dark:bg-stone-900">
                <h2 className="mb-5 text-base font-medium">خلاصه‌ی سفارش</h2>
                <div className="my-3 flex justify-between text-xs">
                  <span>جمع محصولات</span>
                  <strong>{formatPrice(cartTotal)}</strong>
                </div>
                <div className="my-3 flex justify-between text-xs">
                  <span>هزینه‌ی ارسال</span>
                  <strong>{cartTotal >= 2000000 ? 'رایگان' : '۷۵٬۰۰۰ تومان'}</strong>
                </div>
                <p className="my-4 text-[11px] text-stone-500 dark:text-stone-400">
                  سفارش‌های بالای ۲ میلیون تومان رایگان ارسال می‌شوند.
                </p>
                <hr className="border-stone-300 dark:border-stone-700" />
                <div className="my-4 flex justify-between text-xs font-semibold">
                  <span>مبلغ قابل پرداخت</span>
                  <strong>{formatPrice(cartTotal + (cartTotal >= 2000000 ? 0 : 75000))}</strong>
                </div>
                <button
                  className="flex min-h-12 w-full items-center justify-center gap-3 bg-stone-900 text-xs text-white dark:bg-lime-100 dark:text-stone-950"
                  onClick={() => setToast('سفارش شما ثبت اولیه شد! برای هماهنگی تماس بگیرید.')}
                >
                  ادامه و پرداخت <Icon name="arrow" size={16} />
                </button>
                <small className="mt-3 block text-center text-[11px] text-stone-500">
                  پرداخت امن · ارسال تا ۳ روز کاری
                </small>
              </aside>
            </>
          ) : (
            <div className="col-span-full flex min-h-80 flex-col items-center justify-center text-center">
              <span className="grid size-16 place-items-center rounded-full bg-stone-100 dark:bg-stone-900">
                <Icon name="bag" size={28} />
              </span>
              <h2 className="mt-4 text-xl font-medium">سبدت هنوز خالیه</h2>
              <p className="mt-2 text-xs text-stone-500">یک چیز دوست‌داشتنی برای خانه‌ات پیدا کن.</p>
              <a
                className="mt-5 inline-flex items-center gap-3 bg-stone-900 px-5 py-3 text-xs text-white dark:bg-lime-100 dark:text-stone-950"
                href="#shop"
              >
                رفتن به فروشگاه <Icon name="arrow" size={15} />
              </a>
            </div>
          )}
        </section>
      </main>
    )
  }

  // صفحه درباره ما (About)
  function renderAbout() {
    return (
      <main>
        <section className="relative h-[330px] overflow-hidden sm:h-[440px]">
          <SafeImage
            className="size-full object-cover brightness-50"
            src={imageUrl('https://images.pexels.com/photos/28867402/pexels-photo-28867402.jpeg?auto=compress&cs=tinysrgb&w=1500', 1500)}
            alt="میز کار یک هنرمند"
          />
          <div className="absolute inset-y-0 right-[7%] flex flex-col justify-center text-white sm:right-[12%]">
            <Eyebrow className="text-stone-200">قصه‌ی ما</Eyebrow>
            <h1 className="mt-4 text-4xl font-light leading-relaxed sm:text-6xl">
              خانه، جایی‌ست که
              <br />
              <em className="not-italic text-lime-200">قصه‌ها می‌مانند.</em>
            </h1>
          </div>
        </section>

        <section className="mx-auto grid w-[calc(100%-40px)] max-w-6xl gap-6 py-14 sm:w-[calc(100%-64px)] sm:gap-16 sm:py-20 lg:grid-cols-2">
          <div>
            <Eyebrow>یک میز کوچک، یک رؤیای بزرگ</Eyebrow>
            <h2 className="mt-3 text-3xl font-light leading-relaxed">
              ساختن برای <em className="not-italic text-green-800 dark:text-lime-300">زندگی واقعی</em>
            </h2>
          </div>
          <div className="text-xs leading-8 text-stone-600 dark:text-stone-300">
            <p>
              خانه‌زاد از یک دل‌مشغولی ساده شروع شد: چرا چیزهایی که هر روز در خانه می‌بینیم، نباید ما را خوشحال کنند؟ تصمیم گرفتیم به‌جای انبوهی از انتخاب‌های شبیه‌به‌هم، سراغ آدم‌هایی برویم که با دست و دل‌شان چیزی می‌سازند.
            </p>
            <p className="mt-3">
              امروز هر قطعه در خانه‌زاد از دل یک کارگاه کوچک می‌آید؛ با نقص‌های ظریف و دوست‌داشتنی‌ای که یادمان می‌اندازند آدم‌ها آن را ساخته‌اند، نه یک خط تولید بی‌پایان.
            </p>
            <a
              href="#shop"
              className="mt-5 inline-flex min-h-11 items-center gap-3 bg-stone-900 px-5 text-xs text-white dark:bg-lime-100 dark:text-stone-950"
            >
              محصولات ما را ببین <Icon name="arrow" size={16} />
            </a>
          </div>
        </section>

        <section className="bg-stone-100 py-14 dark:bg-stone-900 sm:py-20">
          <div className="mx-auto w-[calc(100%-40px)] max-w-6xl text-center sm:w-[calc(100%-64px)]">
            <Eyebrow>چیزهایی که برایمان مهم‌اند</Eyebrow>
            <h2 className="mt-2 text-3xl font-light">
              کمتر، اما <em className="not-italic text-green-800 dark:text-lime-300">معنادارتر.</em>
            </h2>
            <div className="mt-9 grid gap-5 text-right sm:grid-cols-3">
              {[
                ['۰۱', 'ساخت دست', 'پشت هر محصول یک آدم، یک کارگاه و ساعت‌ها دقت است.'],
                ['۰۲', 'ماندگاری', 'به‌جای دنبال کردنِ زودگذرها، برای سال‌های بعد انتخاب می‌کنیم.'],
                ['۰۳', 'آرامش خانه', 'زیبایی برای ما یعنی فضایی که در آن خودت باشی.'],
              ].map(([number, title, text]) => (
                <div key={number} className="border-t border-stone-300 p-5 dark:border-stone-700">
                  <b className="text-xs text-green-800 dark:text-lime-300">{number}</b>
                  <h3 className="mt-3 text-base font-medium">{title}</h3>
                  <p className="mt-2 max-w-xs text-xs leading-6 text-stone-500 dark:text-stone-400">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    )
  }

  // صفحه تماس با ما (Contact)
  function renderContact() {
    return (
      <main className="min-h-[60vh]">
        <section className="flex flex-col items-center bg-stone-100 px-5 py-12 text-center dark:bg-stone-900">
          <Eyebrow>ما همیشه اینجاییم</Eyebrow>
          <h1 className="mt-3 text-4xl font-light">
            حرفی <em className="not-italic text-green-800 dark:text-lime-300">هست؟</em>
          </h1>
          <p className="mt-3 text-xs text-stone-600 dark:text-stone-300">
            سؤال، پیشنهاد یا حتی یک سلام؛ از شنیدنش خوشحال می‌شویم.
          </p>
        </section>

        <section className="mx-auto grid w-[calc(100%-40px)] max-w-5xl gap-8 py-10 pb-16 sm:w-[calc(100%-64px)] sm:gap-16 sm:py-14 md:grid-cols-2">
          <div>
            <h2 className="text-3xl font-light leading-relaxed">
              از این راه‌ها
              <br />
              <em className="not-italic text-green-800 dark:text-lime-300">پیدایمان کن.</em>
            </h2>
            <p className="mt-3 text-xs leading-6 text-stone-500">
              شنبه تا چهارشنبه، از ساعت ۹ تا ۱۷ پاسخگوی تو هستیم.
            </p>
            <a className="mt-6 block" href="tel:02188881234">
              <span className="block text-xs text-stone-500">تلفن</span>
              <strong className="mt-1 block text-sm font-medium">۰۲۱ - ۸۸۸۸ ۱۲۳۴</strong>
            </a>
            <a className="mt-4 block" href="mailto:hello@khanehzad.ir">
              <span className="block text-xs text-stone-500">ایمیل</span>
              <strong className="mt-1 block text-sm font-medium">hello@khanehzad.ir</strong>
            </a>
            <div className="mt-6 flex items-center gap-3 text-green-800 dark:text-lime-300">
              <Icon name="pin" />
              <span className="text-stone-900 dark:text-stone-100">
                <small className="block text-xs text-stone-500">کارگاه و فروشگاه</small>
                <strong className="mt-1 block text-xs font-medium">تهران، خیابان ولیعصر، کوچه‌ی بهار</strong>
              </span>
            </div>
          </div>

          <form
            className="bg-stone-100 p-5 dark:bg-stone-900 sm:p-7"
            onSubmit={(event) => {
              event.preventDefault()
              setContactSent(true)
            }}
          >
            <h3 className="mb-5 text-base font-medium">پیامت را برایمان بنویس</h3>
            {[
              ['نام تو', 'مثلاً نازنین'],
              ['ایمیل یا شماره تماس', 'راه ارتباطی با تو'],
            ].map(([label, placeholder]) => (
              <label key={label} className="mb-4 flex flex-col gap-2 text-xs">
                {label}
                <input
                  className="border border-stone-200 bg-stone-50 px-3 py-3 text-xs outline-none focus:border-green-800 dark:border-stone-700 dark:bg-stone-950"
                  required
                  placeholder={placeholder}
                />
              </label>
            ))}
            <label className="mb-4 flex flex-col gap-2 text-xs">
              موضوع
              <select
                className="border border-stone-200 bg-stone-50 px-3 py-3 text-xs outline-none dark:border-stone-700 dark:bg-stone-950"
                defaultValue=""
                required
              >
                <option value="" disabled>یک موضوع انتخاب کن</option>
                <option>پیگیری سفارش</option>
                <option>پرسش درباره‌ی محصول</option>
                <option>همکاری</option>
                <option>موضوع دیگر</option>
              </select>
            </label>
            <label className="mb-4 flex flex-col gap-2 text-xs">
              پیام تو
              <textarea
                className="resize-y border border-stone-200 bg-stone-50 px-3 py-3 text-xs outline-none focus:border-green-800 dark:border-stone-700 dark:bg-stone-950"
                rows="4"
                required
                placeholder="هرچه دوست داری بگو..."
              />
            </label>
            <button
              className="inline-flex min-h-11 items-center gap-3 bg-stone-900 px-5 text-xs text-white dark:bg-lime-100 dark:text-stone-950"
              type="submit"
            >
              {contactSent ? 'پیامت فرستاده شد ✓' : 'فرستادن پیام'} <Icon name="arrow" size={16} />
            </button>
            {contactSent && (
              <p className="mt-3 text-xs text-green-800 dark:text-lime-300">
                ممنون که نوشتی؛ به‌زودی با تو تماس می‌گیریم.
              </p>
            )}
          </form>
        </section>
      </main>
    )
  }

  // صفحه مجله (Journal)
  function renderJournal() {
    return (
      <main className="min-h-[60vh]">
        <section className="flex flex-col items-center bg-stone-100 px-5 py-12 text-center dark:bg-stone-900">
          <Eyebrow>کمی مکث، کمی الهام</Eyebrow>
          <h1 className="mt-3 text-4xl font-light">
            مجله‌ی <em className="not-italic text-green-800 dark:text-lime-300">خانه</em>
          </h1>
          <p className="mt-3 text-xs text-stone-600 dark:text-stone-300">
            ایده‌هایی برای زندگی ساده‌تر و خانه‌ای دوست‌داشتنی‌تر.
          </p>
        </section>

        <section className="mx-auto grid w-[calc(100%-40px)] max-w-6xl gap-8 py-10 pb-16 sm:w-[calc(100%-64px)] sm:grid-cols-2 lg:grid-cols-3">
          {stories.map((story) => (
            <a className="group" href="#journal" key={story.title}>
              <SafeImage
                className="aspect-[1.45] w-full object-cover transition duration-500 group-hover:brightness-90"
                src={imageUrl(story.image, 700)}
                alt={story.title}
              />
              <span className="mt-3 block text-[11px] text-stone-500 dark:text-stone-400">{story.meta}</span>
              <h3 className="mt-2 text-sm font-medium leading-7">{story.title}</h3>
              <span className="mt-1 block text-xs text-green-800 dark:text-lime-300">ادامه‌ی مطلب ←</span>
            </a>
          ))}
        </section>
      </main>
    )
  }

  // تصمیم‌گیری برای نمایش صفحه فعلی
  let page
  if (route === 'shop') page = renderShop()
  else if (route === 'cart') page = renderCart()
  else if (route === 'favorites') page = renderShop('علاقه‌مندی‌های تو')
  else if (route.startsWith('product/')) page = renderProduct()
  else if (route === 'about') page = renderAbout()
  else if (route === 'contact') page = renderContact()
  else if (route === 'journal' || route === 'journal-page') page = renderJournal()
  else page = renderHome()

  return (
    <div
      className={`${darkMode ? 'dark' : ''
        } min-h-screen bg-stone-50 font-sans text-stone-900 transition-colors duration-300 dark:bg-stone-950 dark:text-stone-100 [color-scheme:light] dark:[color-scheme:dark]`}
      dir="rtl"
    >
      {header}
      {page}
      {footer}

      {toast && (
        <div
          role="status"
          className="fixed bottom-5 left-1/2 z-50 flex min-h-12 -translate-x-1/2 items-center gap-3 bg-stone-900 px-5 text-xs text-white shadow-xl dark:bg-lime-100 dark:text-stone-950"
        >
          <Icon name="check" size={17} />
          {toast}
          <button className="mr-2" onClick={() => setToast('')} aria-label="بستن">
            <Icon name="close" size={15} />
          </button>
        </div>
      )}
    </div>
  )
}

export default App