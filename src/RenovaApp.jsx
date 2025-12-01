import React, { useState, useEffect } from 'react';
import { 
  Search, Plus, Minus, RotateCcw, History, Users, 
  Settings, LogOut, Package, LayoutDashboard, 
  ChevronRight, Moon, Sun, Download, Trash2, 
  AlertCircle, CheckCircle, Leaf, Box, Globe,
  UserCircle, Key, Upload, X, FileSpreadsheet,
  Eye, EyeOff, Palette, RefreshCcw, Pencil
} from 'lucide-react';

/**
 * RENOVA - Creative Reuse Inventory System
 * Fixed version
 * - Single default export
 * - ErrorBoundary wraps whole app
 * - Removed stray </ErrorBoundary>
 * - Added missing translations
 * - Basic dashboard view + main layout
 */

// --- ERROR BOUNDARY (Crash Protection) ---
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  handleReset = () => {
    if (typeof localStorage !== 'undefined') {
      localStorage.clear();
    }
    if (typeof window !== 'undefined') {
      window.location.reload();
    }
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-red-50 p-6 font-sans text-red-900">
          <div className="max-w-md w-full bg-white p-8 rounded-3xl shadow-2xl border border-red-100 text-center">
            <div className="w-16 h-16 bg-red-100 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <AlertCircle size={40} />
            </div>
            <h1 className="text-2xl font-bold mb-2 text-slate-800">系统已暂停 (System Paused)</h1>
            <p className="mb-6 text-slate-500">The application encountered an unexpected error.</p>
            <div className="bg-slate-50 p-4 rounded-xl text-left text-xs font-mono text-slate-600 mb-6 overflow-auto max-h-32 border border-slate-100">
              {this.state.error && this.state.error.toString()}
            </div>
            <button
              onClick={this.handleReset}
              className="w-full py-3.5 bg-red-500 hover:bg-red-600 text-white rounded-xl font-bold transition-all shadow-lg shadow-red-200"
            >
              重置系统数据并重启 (Reset & Restart)
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

// --- Constants ---

const CATEGORIES = [
  "Paper & Cardboard", "Fabric & Textiles", "Wood", 
  "Plastic", "Metal", "Glass", "Nature", "Electronics", "Stationery"
];

const INITIAL_INVENTORY = [
  { id: 1, name: "Cardboard Tubes", category: "Paper & Cardboard", quantity: 150, available: true, location: "Bin A1", image: "https://images.unsplash.com/photo-1589792923962-537704632910?auto=format&fit=crop&w=300&q=80", description: "Assorted sizes of cardboard tubes." },
  { id: 2, name: "Fabric Scraps", category: "Fabric & Textiles", quantity: 45, available: true, location: "Shelf B2", image: "https://images.unsplash.com/photo-1521980066195-207d58a5e12f?auto=format&fit=crop&w=300&q=80", description: "Colorful cotton offcuts." },
  { id: 3, name: "Wine Corks", category: "Wood", quantity: 300, available: true, location: "Bin A3", image: "https://images.unsplash.com/photo-1516546700755-e87f2258544d?auto=format&fit=crop&w=300&q=80", description: "Natural corks." },
];

const INITIAL_USERS = [
  { id: 'u1', name: 'Admin', role: 'admin', username: 'admin', password: '123' },
  { id: 'u2', name: 'Volunteer', role: 'volunteer', username: 'volunteer', password: '123' },
];

const TRANSLATIONS = {
  en: {
    appTitle: "Renova",
    appSubtitle: "Creative Reuse Inventory System",
    orgNameDefault: "Renova Recycle Center",
    welcome: "Welcome",
    startTeacher: "Start (Public/Class)",
    adminLogin: "Admin / Volunteer Login",
    enterPassword: "Enter Password",
    login: "Login",
    wrongPassword: "Incorrect password",
    dashboard: "Dashboard",
    inventory: "Inventory",
    returnItem: "Return Item",
    activityLog: "Activity Log",
    adminSettings: "Admin Settings",
    totalStock: "Total Items",
    itemsOut: "Items Borrowed",
    recentActivity: "Recent Activity",
    borrow: "Borrow",
    return: "Return",
    searchPlaceholder: "Search materials...",
    allCategories: "All Categories",
    inStock: "Available",
    outOfStock: "Out of Stock",
    unavailable: "Unavailable",
    borrowModalTitle: "Borrow Item",
    className: "Class Name",
    classNamePlaceholder: "Filter by Class Name...",
    purpose: "Purpose / Activity",
    purposePlaceholder: "What will you make?",
    confirmBorrow: "Confirm Borrow",
    cancel: "Cancel",
    returnModalTitle: "Return Item",
    story: "Activity Story / Feedback",
    storyPlaceholder: "How was the material used?",
    uploadImage: "Upload Photo (Required)",
    confirmReturn: "Confirm Return",
    addItem: "Add New Item",
    editItem: "Edit Item",
    saveChanges: "Save Changes",
    itemName: "Item Name",
    itemNamePlaceholder: "e.g. Cardboard Tubes",
    category: "Category",
    quantity: "Quantity",
    location: "Location",
    locationPlaceholder: "e.g. Bin A1",
    description: "Description",
    descriptionPlaceholder: "Brief details about the item...",
    imageUpload: "Item Image",
    clickUpload: "Click to upload from computer",
    removeImage: "Remove Image",
    logout: "Exit Mode",
    borrowed: "borrowed",
    returned: "returned",
    added: "added",
    edited: "edited",
    noActivity: "No activity recorded yet.",
    resetSystem: "Reset System Data",
    dangerZone: "Danger Zone",
    userMgmt: "User Management",
    sysConfig: "System Configuration",
    organization: "Organization Name",
    logoUpload: "Upload Logo (Replaces Title)",
    appearance: "Appearance",
    landingBg: "Landing Page Background",
    bgColor: "Background Color",
    bgImage: "Background Image",
    findMyItems: "Search / Filter",
    noItemsFound: "No active loans found.",
    enterClassToReturn: "Select an item below to return it.",
    admin: "Admin",
    volunteer: "Volunteer",
    delete: "Delete",
    edit: "Edit",
    markUnavailable: "Mark Unavailable",
    markAvailable: "Mark Available",
    exportCSV: "Download Report (Excel/CSV)",
    confirmDelete: "Are you sure you want to delete this?",
    logoInfo: "Upload an image file from your computer.",
    addUser: "Add User",
    username: "Username",
    password: "Password",
    role: "Role",
    changePassword: "Change Password",
    newPassword: "New Password",
    passwordChanged: "Password changed successfully",
    userAdded: "User added successfully",
    accessDenied: "Access Denied",
    selectUser: "Select User",
    resetLogo: "Reset to Default Logo",
    loc: "Loc",
    returning: "Returning", // added
    language: "Language"
  },
  zh: {
    appTitle: "Renova",
    appSubtitle: "创意再生库存系统",
    orgNameDefault: "资源再造中心",
    welcome: "欢迎",
    startTeacher: "开始 (公共/班级)",
    adminLogin: "管理员/志愿者登录",
    enterPassword: "输入密码",
    login: "登录",
    wrongPassword: "密码错误",
    dashboard: "仪表盘",
    inventory: "库存列表",
    returnItem: "归还物品",
    activityLog: "活动记录",
    adminSettings: "后台设置",
    totalStock: "库存总数",
    itemsOut: "借出物品",
    recentActivity: "近期活动",
    borrow: "借用",
    return: "归还",
    searchPlaceholder: "搜索材料...",
    allCategories: "所有分类",
    inStock: "可用",
    outOfStock: "缺货",
    unavailable: "不可用",
    borrowModalTitle: "借用物品",
    className: "班级名称",
    classNamePlaceholder: "按班级名称筛选...",
    purpose: "用途 / 活动",
    purposePlaceholder: "你们将制作什么？",
    confirmBorrow: "确认借用",
    cancel: "取消",
    returnModalTitle: "归还物品",
    story: "活动反馈 / 故事",
    storyPlaceholder: "材料是如何使用的？",
    uploadImage: "上传照片 (必须)",
    confirmReturn: "确认归还",
    addItem: "添加新物品",
    editItem: "编辑物品",
    saveChanges: "保存更改",
    itemName: "物品名称",
    itemNamePlaceholder: "例如：纸板管",
    category: "分类",
    quantity: "数量",
    location: "位置",
    locationPlaceholder: "例如：A1 箱",
    description: "描述",
    descriptionPlaceholder: "关于物品的简要描述...",
    imageUpload: "上传图片",
    clickUpload: "点击上传本地图片",
    removeImage: "移除图片",
    logout: "退出模式",
    borrowed: "借用了",
    returned: "归还了",
    added: "添加了",
    edited: "编辑了",
    noActivity: "暂无活动记录",
    resetSystem: "重置系统数据",
    dangerZone: "危险区域",
    userMgmt: "用户管理",
    sysConfig: "系统配置",
    organization: "组织名称",
    logoUpload: "上传 Logo (替换标题)",
    appearance: "外观设置",
    landingBg: "首页背景设置",
    bgColor: "背景颜色",
    bgImage: "背景图片",
    findMyItems: "搜索 / 筛选",
    noItemsFound: "未找到借用记录",
    enterClassToReturn: "请在下方选择要归还的物品",
    admin: "管理员",
    volunteer: "志愿者",
    delete: "删除",
    edit: "编辑",
    markUnavailable: "设为不可用",
    markAvailable: "设为可用",
    exportCSV: "下载报告 (Excel/CSV)",
    confirmDelete: "确定要删除吗？",
    logoInfo: "从您的电脑上传图片文件。",
    addUser: "添加用户",
    username: "用户名",
    password: "密码",
    role: "角色",
    changePassword: "修改密码",
    newPassword: "新密码",
    passwordChanged: "密码修改成功",
    userAdded: "用户添加成功",
    accessDenied: "拒绝访问",
    selectUser: "选择用户",
    resetLogo: "重置为默认 Logo",
    loc: "位置",
    returning: "正在归还物品",
    language: "语言"
  }
};

// --- Helper Components ---

const AutoScaleText = ({ text, className = "" }) => {
  const str = String(text || "0"); 
  let fontSizeClass = "text-4xl"; 
  if (str.length > 9) fontSizeClass = "text-lg";
  else if (str.length > 6) fontSizeClass = "text-xl";
  else if (str.length > 5) fontSizeClass = "text-2xl";
  else if (str.length > 4) fontSizeClass = "text-3xl";

  return (
    <div className={`${className} ${fontSizeClass} font-bold leading-tight transition-all duration-200`}>
      {text}
    </div>
  );
};

const Card = ({ children, className = "" }) => (
  <div className={`bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden break-words ${className}`}>
    {children}
  </div>
);

const Button = ({ children, onClick, variant = "primary", className = "", disabled = false, icon: Icon, title, type = "button" }) => {
  const baseStyle = "px-5 py-2.5 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2 focus:ring-2 focus:ring-offset-2 tracking-wide disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: `bg-[#e93949] hover:bg-[#d63443] text-white focus:ring-[#e93949] shadow-sm hover:shadow-md`,
    secondary: "bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-800 dark:text-slate-100 focus:ring-slate-500",
    danger: "bg-red-500 hover:bg-red-600 text-white focus:ring-red-500 shadow-sm",
    outline: `border-2 border-slate-200 dark:border-slate-600 hover:border-[#e93949] text-slate-600 dark:text-slate-300 hover:text-[#e93949]`,
    ghost: "text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
  };

  return (
    <button 
      type={type}
      onClick={onClick} 
      disabled={disabled}
      className={`${baseStyle} ${variants[variant]} ${className}`}
      title={title}
    >
      {Icon && <Icon size={18} />}
      {children}
    </button>
  );
};

const Badge = ({ children, color = "slate" }) => {
  const colors = {
    slate: "bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-slate-200",
    emerald: "bg-[#e93949]/10 text-[#e93949] border border-[#e93949]/20", 
    amber: "bg-[#ecb282]/20 text-orange-700 border border-[#ecb282]/30",
    red: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
    gray: "bg-slate-200 text-slate-600 dark:bg-slate-700 dark:text-slate-400",
  };
  return (
    <span className={`px-2.5 py-1 rounded-md text-xs font-semibold tracking-wide whitespace-nowrap ${colors[color]}`}>
      {children}
    </span>
  );
};

const Input = ({ label, type = "text", value, onChange, placeholder, min, max, required = false, className="" }) => (
  <div className="flex flex-col gap-1.5 w-full">
    {label && <label className="text-sm font-medium text-slate-700 dark:text-slate-300">{label}</label>}
    <input 
      type={type} 
      value={value} 
      onChange={onChange} 
      placeholder={placeholder}
      min={min}
      max={max}
      required={required}
      className={`w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-[#e93949] focus:border-transparent outline-none transition-all placeholder:text-slate-400 ${className}`}
    />
  </div>
);

const Modal = ({ children, onClose, title }) => (
  <div className="fixed inset-0 z-[9999] flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-300 font-sans">
    <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-300 border border-white/20">
      <div className="px-8 py-6 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center bg-slate-50/50 dark:bg-slate-900/50 sticky top-0 backdrop-blur-sm z-10">
        <h3 className="font-bold text-xl text-slate-900 dark:text-white tracking-tight">{title}</h3>
        <button onClick={onClose} className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors">
          <X size={24} />
        </button>
      </div>
      <div className="p-8">
        {children}
      </div>
    </div>
  </div>
);

// --- FORMS ---

const ItemForm = ({ initialData, onSubmit, onCancel, mode = "add", t }) => {
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    category: initialData?.category || CATEGORIES[0],
    quantity: initialData?.quantity || 1,
    location: initialData?.location || '',
    description: initialData?.description || '',
    image: initialData?.image || ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const clearImage = () => setFormData(prev => ({ ...prev, image: '' }));

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input 
        label={t('itemName')} 
        value={formData.name} 
        onChange={e => setFormData({...formData, name: e.target.value})} 
        required 
        placeholder={t('itemNamePlaceholder')}
      />
      
      <div>
        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">{t('category')}</label>
        <select
          value={formData.category}
          onChange={e => setFormData({...formData, category: e.target.value})}
          className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white mt-1 focus:ring-2 focus:ring-[#e93949] outline-none"
        >
          {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Input 
          type="number" 
          label={t('quantity')} 
          min="1" 
          value={formData.quantity} 
          onChange={e => setFormData({...formData, quantity: parseInt(e.target.value || '1', 10)})} 
          required 
        />
        <Input 
          label={t('location')} 
          value={formData.location} 
          onChange={e => setFormData({...formData, location: e.target.value})} 
          required 
          placeholder={t('locationPlaceholder')} 
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">{t('description')}</label>
        <textarea
          value={formData.description}
          onChange={e => setFormData({...formData, description: e.target.value})}
          className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-[#e93949] outline-none transition-all"
          rows={3}
          placeholder={t('descriptionPlaceholder')}
        />
      </div>

      <div>
        <label className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5 block">{t('imageUpload')}</label>
        <div className="p-4 bg-slate-100 dark:bg-slate-700 rounded-lg border-2 border-dashed border-slate-300 dark:border-slate-600 hover:border-[#e93949] transition-colors relative">
          <input 
            type="file" 
            accept="image/*"
            onChange={handleImageUpload}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          <div className="flex flex-col items-center justify-center gap-2">
            {formData.image ? (
              <div className="relative">
                <img src={formData.image} alt="Preview" className="h-32 object-contain rounded-md shadow-sm" />
              </div>
            ) : (
              <div className="flex items-center gap-2 text-slate-500 py-4">
                <Upload size={20} /> <span className="font-medium">{t('clickUpload')}</span>
              </div>
            )}
          </div>
        </div>
        {formData.image && (
          <button type="button" onClick={clearImage} className="text-xs text-red-500 mt-2 hover:underline w-full text-center">
            {t('removeImage')}
          </button>
        )}
      </div>

      <div className="flex gap-3 pt-4">
        <Button onClick={onCancel} variant="secondary" className="flex-1">{t('cancel')}</Button>
        <Button type="submit" className="flex-1">{mode === "edit" ? t('saveChanges') : t('addItem')}</Button>
      </div>
    </form>
  );
};

const BorrowForm = ({ item, onSubmit, onCancel, t }) => {
  const [name, setName] = useState('');
  const [reason, setReason] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && reason) onSubmit(name, reason);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-slate-50 dark:bg-slate-700/50 p-4 rounded-xl flex gap-4 items-center border border-slate-100 dark:border-slate-600">
        {item.image ? (
          <img src={item.image} alt={item.name} className="w-16 h-16 rounded-lg object-cover" />
        ) : (
          <div className="w-16 h-16 bg-slate-200 dark:bg-slate-600 rounded-lg flex items-center justify-center">
            <Package size={24}/>
          </div>
        )}
        <div>
          <div className="font-bold text-slate-900 dark:text-white">{item.name}</div>
          <div className="text-sm text-slate-500">{item.location}</div>
        </div>
      </div>
      <Input
        label={t('className')}
        value={name}
        onChange={e => setName(e.target.value)}
        required
        placeholder={t('classNamePlaceholder')}
      />
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">{t('purpose')}</label>
        <textarea
          value={reason}
          onChange={e => setReason(e.target.value)}
          required
          className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-[#e93949] outline-none"
          placeholder={t('purposePlaceholder')}
          rows={3}
        />
      </div>
      <div className="flex gap-3 pt-2">
        <Button onClick={onCancel} variant="secondary" className="flex-1">{t('cancel')}</Button>
        <Button type="submit" className="flex-1">{t('confirmBorrow')}</Button>
      </div>
    </form>
  );
};

const ReturnForm = ({ loan, onSubmit, onCancel, t }) => {
  const [story, setStory] = useState('');
  const [image, setImage] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(story, image);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl border border-emerald-100 dark:border-emerald-800/30 text-emerald-800 dark:text-emerald-200">
        <div className="text-sm font-bold opacity-70 uppercase tracking-wide">{t('returning')}</div>
        <div className="text-lg font-bold">{loan.itemName}</div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">{t('story')}</label>
        <textarea
          value={story}
          onChange={e => setStory(e.target.value)}
          className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-[#e93949] outline-none"
          placeholder={t('storyPlaceholder')}
          rows={3}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">{t('uploadImage')}</label>
        <input 
          type="file" 
          accept="image/*"
          onChange={(e) => setImage(e.target.files?.[0] || null)}
          className="block w-full text-sm text-slate-500
            file:mr-4 file:py-2.5 file:px-4
            file:rounded-full file:border-0
            file:text-sm file:font-semibold
            file:bg-[#e93949]/10 file:text-[#e93949]
            hover:file:bg-[#e93949]/20"
        />
      </div>

      <div className="flex gap-3 pt-2">
        <Button onClick={onCancel} variant="secondary" className="flex-1">{t('cancel')}</Button>
        <Button type="submit" variant="primary" className="flex-1 bg-emerald-600 hover:bg-emerald-700">{t('confirmReturn')}</Button>
      </div>
    </form>
  );
};

// --- Main Application Component ---

function RenovaCore() {
  const [lang, setLang] = useState<'en' | 'zh'>('en'); 
  const [viewMode, setViewMode] = useState<'landing' | 'public' | 'admin'>('landing');
  const [currentUser, setCurrentUser] = useState(null); 
  const [activeTab, setActiveTab] = useState('inventory');
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [passwordModalOpen, setPasswordModalOpen] = useState(false);
  
  // Data States
  const [inventory, setInventory] = useState(() => {
    try {
      const saved = typeof localStorage !== 'undefined' ? localStorage.getItem('renova_inventory') : null;
      const parsed = saved ? JSON.parse(saved) : null;
      return Array.isArray(parsed) ? parsed : INITIAL_INVENTORY;
    } catch { return INITIAL_INVENTORY; }
  });
  
  const [users, setUsers] = useState(() => {
    try {
      const saved = typeof localStorage !== 'undefined' ? localStorage.getItem('renova_users') : null;
      const parsed = saved ? JSON.parse(saved) : null;
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      return INITIAL_USERS;
    } catch { return INITIAL_USERS; }
  });

  const [logs, setLogs] = useState(() => {
    try {
      const saved = typeof localStorage !== 'undefined' ? localStorage.getItem('renova_logs') : null;
      const parsed = saved ? JSON.parse(saved) : null;
      return Array.isArray(parsed) ? parsed : [];
    } catch { return []; }
  });

  const [activeLoans, setActiveLoans] = useState(() => {
    try {
      const saved = typeof localStorage !== 'undefined' ? localStorage.getItem('renova_loans') : null;
      const parsed = saved ? JSON.parse(saved) : null;
      return Array.isArray(parsed) ? parsed : [];
    } catch { return []; }
  });

  // Config States
  const [orgName, setOrgName] = useState(() => (typeof localStorage !== 'undefined' ? localStorage.getItem('renova_org_name') : "") || "");
  const [appLogo, setAppLogo] = useState(() => (typeof localStorage !== 'undefined' ? localStorage.getItem('renova_app_logo') : "") || "");
  const [landingBgColor, setLandingBgColor] = useState(() => (typeof localStorage !== 'undefined' ? localStorage.getItem('renova_landing_bg_color') : "") || "");
  const [landingBgImage, setLandingBgImage] = useState(() => (typeof localStorage !== 'undefined' ? localStorage.getItem('renova_landing_bg_image') : "") || "");

  // Persistence
  useEffect(() => { if (typeof localStorage !== 'undefined') localStorage.setItem('renova_inventory', JSON.stringify(inventory)); }, [inventory]);
  useEffect(() => { if (typeof localStorage !== 'undefined') localStorage.setItem('renova_users', JSON.stringify(users)); }, [users]);
  useEffect(() => { if (typeof localStorage !== 'undefined') localStorage.setItem('renova_logs', JSON.stringify(logs)); }, [logs]);
  useEffect(() => { if (typeof localStorage !== 'undefined') localStorage.setItem('renova_loans', JSON.stringify(activeLoans)); }, [activeLoans]);
  useEffect(() => { if (typeof localStorage !== 'undefined') localStorage.setItem('renova_org_name', orgName); }, [orgName]);
  useEffect(() => { if (typeof localStorage !== 'undefined') localStorage.setItem('renova_app_logo', appLogo); }, [appLogo]);
  useEffect(() => { if (typeof localStorage !== 'undefined') localStorage.setItem('renova_landing_bg_color', landingBgColor); }, [landingBgColor]);
  useEffect(() => { if (typeof localStorage !== 'undefined') localStorage.setItem('renova_landing_bg_image', landingBgImage); }, [landingBgImage]);
  
  // GLOBAL STYLE INJECTION TO FIX WHITE BARS
  useEffect(() => {
    if (typeof document === 'undefined') return;
    const style = document.createElement('style');
    style.textContent = `
      html, body { margin: 0; padding: 0; width: 100%; height: 100%; }
      #root { width: 100%; height: 100%; }
    `;
    document.head.appendChild(style);
    return () => {
      if (document.head.contains(style)) document.head.removeChild(style);
    };
  }, []);

  useEffect(() => {
    if (typeof document === 'undefined') return;
    if (darkMode) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, [darkMode]);

  const t = (key: keyof typeof TRANSLATIONS['en'] | string) => TRANSLATIONS[lang][key] || key;
  const getOrgName = () => orgName || t('orgNameDefault');

  const addNotification = (type: 'success' | 'error', message: string) => {
    const id = Date.now();
    setNotifications(prev => [...prev, { id, type, message }]);
    setTimeout(() => setNotifications(prev => prev.filter(n => n.id !== id)), 4000);
  };

  const logActivity = (action, itemName, className, note, imageUrl = null) => {
    const newLog = {
      id: Date.now(),
      date: new Date().toISOString(),
      userName: className || (currentUser ? currentUser.name : 'Guest'),
      userRole: currentUser ? currentUser.role : 'Class',
      action: action || 'unknown',
      itemName: itemName || 'unknown',
      note: note || '',
      imageUrl: imageUrl || ''
    };
    setLogs(prev => [newLog, ...(Array.isArray(prev) ? prev : [])]);
  };

  // Inventory Logic
  const handleAddItem = (newItem) => {
    if (!newItem) return;
    const itemWithId = { ...newItem, id: Date.now(), available: true };
    setInventory(prev => [...(Array.isArray(prev) ? prev : []), itemWithId]);
    logActivity('add_inventory', newItem.name, currentUser ? currentUser.name : 'Admin', 'New item added');
    addNotification('success', t('added') + " " + newItem.name);
  };

  const handleUpdateItem = (id, updatedData) => {
    setInventory(prev => (Array.isArray(prev) ? prev : []).map(item => item.id === id ? { ...item, ...updatedData } : item));
    logActivity('edit_item', updatedData.name, currentUser ? currentUser.name : 'Admin', 'Item details updated');
    addNotification('success', t('edited') + " " + updatedData.name);
  };

  const handleBorrow = (item, className, reason) => {
    const newLoan = {
      id: Date.now(),
      itemId: item.id,
      itemName: item.name,
      itemImage: item.image,
      className: className, 
      borrowDate: new Date().toISOString(),
      reason
    };
    setActiveLoans(prev => [...(Array.isArray(prev) ? prev : []), newLoan]);
    logActivity('borrow', item.name, className, reason);
    addNotification('success', `${t('borrowed')} ${item.name}`);
  };

  const handleReturn = (loan, story, imageFile) => {
    setActiveLoans(prev => (Array.isArray(prev) ? prev : []).filter(l => l.id !== loan.id));
    const imageUrl = imageFile ? URL.createObjectURL(imageFile) : null;
    logActivity('return', loan.itemName, loan.className, story, imageUrl);
    addNotification('success', t('return') + ' success!');
  };

  const handleDeleteItem = (itemId) => {
    if (window.confirm(t('confirmDelete'))) {
      const item = (Array.isArray(inventory) ? inventory : []).find(i => i.id === itemId);
      setInventory(prev => (Array.isArray(prev) ? prev : []).filter(i => i.id !== itemId));
      logActivity('delete_item', item?.name || 'Unknown', currentUser ? currentUser.name : 'Admin', 'Item deleted');
      addNotification('success', 'Item deleted');
    }
  };

  const handleToggleAvailability = (itemId) => {
    setInventory(prev => (Array.isArray(prev) ? prev : []).map(item => item.id === itemId ? { ...item, available: !item.available } : item));
  };

  const handleDeleteLog = (logId) => {
    if (window.confirm(t('confirmDelete'))) {
      setLogs(prev => (Array.isArray(prev) ? prev : []).filter(l => l.id !== logId));
      addNotification('success', 'Log removed');
    }
  };

  // Config Logic
  const handleLogoUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => { setAppLogo(reader.result as string); addNotification('success', 'Logo updated'); };
      reader.readAsDataURL(file);
    }
  };

  const handleResetLogo = () => {
    setAppLogo(""); 
    addNotification('success', 'Logo reset to default');
  };

  const handleBgImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => { setLandingBgImage(reader.result as string); addNotification('success', 'Background updated'); };
      reader.readAsDataURL(file);
    }
  };

  // Auth Logic
  const handleAdminLogin = (user) => {
    setCurrentUser(user);
    setViewMode('admin');
    setActiveTab('dashboard');
    addNotification('success', `${t('welcome')}, ${user.name}`);
  };

  const handlePublicEntry = () => {
    setCurrentUser(null);
    setViewMode('public');
    setActiveTab('inventory');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setViewMode('landing');
    setLang('en'); 
  };

  const handleChangePassword = (newPass) => {
    if (currentUser && newPass) {
      setUsers(prev => (Array.isArray(prev) ? prev : []).map(u => u.id === currentUser.id ? { ...u, password: newPass } : u));
      setCurrentUser(prev => prev ? ({...prev, password: newPass}) : prev);
      addNotification('success', t('passwordChanged'));
    }
  };

  const exportLogsToCSV = () => {
    const safeLogs = Array.isArray(logs) ? logs : [];
    const headers = ["Date", "User/Class", "Role", "Action", "Item", "Note", "ImageURL"];
    const csvContent = [headers.join(","), ...safeLogs.map(log => [
      new Date(log.date).toLocaleString(),
      `"${log.userName}"`,
      log.userRole,
      log.action,
      `"${log.itemName}"`,
      `"${log.note || ''}"`,
      log.imageUrl || ''
    ].join(","))].join("\n");
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `renova_report_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const BrandLogo = ({ size = "normal" }) => {
    const containerClass = size === "large" ? "w-24 h-24 rounded-2xl" : "w-10 h-10 rounded-lg";
    const iconSize = size === "large" ? 48 : 20;
    return (
      <div className={`${containerClass} bg-[#e93949] text-white flex items-center justify-center shadow-sm shrink-0`}>
        <Leaf size={iconSize} />
      </div>
    );
  };

  const ChangePasswordModal = ({ onClose }) => {
    const [pass, setPass] = useState('');
    return (
      <Modal onClose={onClose} title={t('changePassword')}>
        <div className="space-y-4">
          <Input
            type="password"
            label={t('newPassword')}
            value={pass}
            onChange={e => setPass(e.target.value)}
            required
          />
          <Button onClick={() => { handleChangePassword(pass); onClose(); }} className="w-full">
            {t('changePassword')}
          </Button>
        </div>
      </Modal>
    );
  };

  // --- VIEWS ---

  const LandingView = () => {
    const [step, setStep] = useState<'lang'|'selection'|'login'>('lang'); 
    const [selectedAdminUser, setSelectedAdminUser] = useState(null);
    const [passwordInput, setPasswordInput] = useState('');

    const verifyPassword = () => {
      if (selectedAdminUser && passwordInput === selectedAdminUser.password) {
        handleAdminLogin(selectedAdminUser);
      } else {
        addNotification('error', t('wrongPassword'));
      }
    };

    const logoSource = appLogo || "./icon.png"; 
    const containerStyle: React.CSSProperties = {
      backgroundColor: landingBgColor || undefined,
      backgroundImage: landingBgImage ? `url(${landingBgImage})` : undefined,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    };
    const defaultClasses = (!landingBgColor && !landingBgImage) ? "bg-slate-50 dark:bg-slate-900" : "";

    return (
      <div className={`min-h-screen flex flex-col items-center justify-center p-6 font-sans relative ${defaultClasses}`} style={containerStyle}>
        {landingBgImage && <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />}
        <div className="relative z-10 w-full max-w-4xl flex flex-col items-center">
          {step !== 'login' && (
            <div className="text-center mb-12 animate-in fade-in zoom-in duration-500 max-w-2xl mx-auto w-full">
              <div className="flex justify-center mb-8 h-24 items-center">
                <img
                  src={logoSource}
                  alt="Logo"
                  className="max-h-32 max-w-[240px] object-contain drop-shadow-xl"
                  onError={(e) => {
                    (e.target as HTMLImageElement).onerror = null;
                    (e.target as HTMLImageElement).style.display='none';
                    const fallback = document.getElementById('fallback-logo');
                    if (fallback) fallback.style.display='flex';
                  }}
                />
                <div className="hidden" id="fallback-logo">
                  <BrandLogo size="large" />
                </div>
              </div>
              <h1 className={`text-4xl md:text-5xl font-bold mb-4 tracking-tight leading-tight ${landingBgImage ? 'text-white' : 'text-slate-900 dark:text-white'}`}>
                {t('appTitle')}
              </h1>
              <p className={`text-lg md:text-xl font-light ${landingBgImage ? 'text-white/90' : 'text-slate-500 dark:text-slate-400'}`}>
                {t('appSubtitle')}
              </p>
            </div>
          )}

          {step === 'lang' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-xl">
              <button
                onClick={() => { setLang('en'); setStep('selection'); }}
                className="p-6 bg-white/90 dark:bg-slate-800/90 backdrop-blur rounded-2xl shadow-xl border-2 border-transparent hover:border-[#e93949] transition-all text-center hover:scale-[1.02] duration-300"
              >
                <div className="text-xl font-bold text-slate-800 dark:text-white">English</div>
              </button>
              <button
                onClick={() => { setLang('zh'); setStep('selection'); }}
                className="p-6 bg-white/90 dark:bg-slate-800/90 backdrop-blur rounded-2xl shadow-xl border-2 border-transparent hover:border-[#e93949] transition-all text-center hover:scale-[1.02] duration-300"
              >
                <div className="text-xl font-bold text-slate-800 dark:text-white">中文</div>
              </button>
            </div>
          )}

          {step === 'selection' && (
            <>
              <button
                onClick={() => setStep('lang')}
                className={`absolute top-0 left-0 flex items-center gap-2 px-4 py-2 rounded-full ${
                  landingBgImage
                    ? 'text-white hover:bg-white/20'
                    : 'text-slate-500 hover:text-[#e93949] hover:bg-slate-100'
                }`}
              >
                <Globe size={18} /> {t('language')}
              </button>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full animate-in slide-in-from-bottom-8 duration-500">
                <button
                  onClick={handlePublicEntry}
                  className="bg-[#e93949] text-white rounded-3xl p-10 shadow-2xl hover:bg-[#d63443] transition-all text-left flex flex-col justify-between h-80 hover:-translate-y-2 group"
                >
                  <div>
                    <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-6 backdrop-blur-sm group-hover:scale-110 transition-transform">
                      <UserCircle size={36} />
                    </div>
                    <h2 className="text-3xl font-bold mb-2">{t('startTeacher')}</h2>
                    <p className="text-white/90 text-lg opacity-90">Browse, Borrow & Return materials.</p>
                  </div>
                  <div className="flex items-center gap-2 font-bold text-lg mt-4">
                    Go <ChevronRight size={24} />
                  </div>
                </button>
                <button
                  onClick={() => setStep('login')}
                  className="bg-white/95 dark:bg-slate-800/95 backdrop-blur text-slate-800 dark:text-white rounded-3xl p-10 shadow-xl border border-slate-200 dark:border-slate-700 hover:border-[#e93949] transition-all text-left flex flex-col justify-between h-80 hover:-translate-y-2 group"
                >
                  <div>
                    <div className="w-16 h-16 bg-slate-100 dark:bg-slate-700 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                      <Settings size={36} className="text-slate-600 dark:text-slate-300" />
                    </div>
                    <h2 className="text-3xl font-bold mb-2">{t('adminLogin')}</h2>
                    <p className="text-slate-500 dark:text-slate-400 text-lg">Manage inventory & users.</p>
                  </div>
                  <div className="flex items-center gap-2 font-bold text-lg mt-4 text-slate-600 dark:text-slate-300 group-hover:text-[#e93949]">
                    Login <ChevronRight size={24} />
                  </div>
                </button>
              </div>
            </>
          )}

          {step === 'login' && (
            <div className="w-full max-w-md bg-white dark:bg-slate-800 rounded-3xl shadow-2xl p-8 animate-in fade-in duration-300 relative border border-slate-100 dark:border-slate-700">
              <button
                onClick={() => { setStep('selection'); setSelectedAdminUser(null); setPasswordInput(''); }}
                className="absolute top-6 left-6 text-slate-500 hover:text-[#e93949] p-2"
              >
                <X size={24} />
              </button>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-8 text-center">{t('adminLogin')}</h2>
              {!selectedAdminUser ? (
                <div className="space-y-4">
                  <p className="text-center text-slate-500 mb-4 font-medium">{t('selectUser') || "Select User"}</p>
                  {(Array.isArray(users) ? users : []).length > 0 ? (
                    (Array.isArray(users) ? users : []).map(u => (
                      <button
                        key={u.id}
                        onClick={() => setSelectedAdminUser(u)}
                        className="w-full p-4 rounded-xl bg-slate-50 dark:bg-slate-700/50 hover:bg-[#e93949]/10 hover:text-[#e93949] dark:hover:text-[#e93949] text-slate-600 dark:text-slate-300 transition-all flex items-center gap-3 border border-transparent hover:border-[#e93949]/30"
                      >
                        <Key size={20} className="text-slate-400" />
                        <div className="text-left">
                          <div className="font-bold">{u.name}</div>
                          <div className="text-xs uppercase tracking-wider opacity-70">{t(u.role)}</div>
                        </div>
                      </button>
                    ))
                  ) : (
                    <div className="text-center text-red-500 p-4">No users found. Please restart app to reset.</div>
                  )}
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="text-center p-4 bg-slate-50 dark:bg-slate-700/30 rounded-xl border border-slate-100 dark:border-slate-600">
                    <div className="text-sm text-slate-500">{t('welcome')}</div>
                    <div className="font-bold text-xl text-[#e93949]">{selectedAdminUser.name}</div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-600 ml-1">{t('enterPassword') || "Enter Password"}</label>
                    <Input
                      type="password"
                      value={passwordInput}
                      onChange={e => setPasswordInput(e.target.value)}
                      className="text-center text-lg h-12"
                    />
                  </div>
                  <Button className="w-full py-3 text-lg" onClick={verifyPassword}>{t('login')}</Button>
                  <button
                    onClick={() => { setSelectedAdminUser(null); setPasswordInput(''); }}
                    className="w-full text-center text-sm text-slate-400 hover:text-slate-600 underline"
                  >
                    {t('cancel')}
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    );
  };

  const InventoryView = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('All');
    const [selectedItem, setSelectedItem] = useState(null);
    const [borrowModalOpen, setBorrowModalOpen] = useState(false);
    const [addItemModalOpen, setAddItemModalOpen] = useState(false);
    const [editItemModalOpen, setEditItemModalOpen] = useState(false);

    const safeInventory = Array.isArray(inventory) ? inventory : [];

    const filteredItems = safeInventory.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = categoryFilter === 'All' || item.category === categoryFilter;
      return matchesSearch && matchesCategory;
    });

    return (
      <div className="space-y-6 md:space-y-8 font-sans pb-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 md:gap-6">
          <h2 className="text-3xl font-bold text-slate-800 dark:text-white tracking-tight">{t('inventory')}</h2>
          {viewMode === 'admin' && (
            <Button onClick={() => setAddItemModalOpen(true)} icon={Plus}>{t('addItem')}</Button>
          )}
        </div>

        <div className="flex flex-col md:flex-row gap-4 md:gap-6 bg-white dark:bg-slate-800 p-4 md:p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-3.5 text-slate-400" size={20} />
            <input 
              type="text" 
              placeholder={t('searchPlaceholder')} 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-900/50 focus:ring-2 focus:ring-[#e93949] outline-none transition-all"
            />
          </div>
          <div className="md:w-64">
            <select 
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-900/50 focus:ring-2 focus:ring-[#e93949] outline-none appearance-none"
            >
              <option value="All">{t('allCategories')}</option>
              {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {filteredItems.map(item => (
            <Card key={item.id} className={`flex flex-col h-full group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 ${!item.available ? 'grayscale opacity-70' : ''}`}>
              <div className="h-48 md:h-56 overflow-hidden bg-slate-100 relative">
                {item.image ? (
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-300 bg-slate-100 dark:bg-slate-800">
                    <Package size={64} strokeWidth={1} />
                  </div>
                )}
                
                {!item.available && (
                  <div className="absolute inset-0 bg-slate-900/40 flex items-center justify-center backdrop-blur-[2px]">
                    <div className="bg-slate-800 text-white px-4 py-2 rounded-lg font-bold shadow-xl border border-slate-600">
                      {t('unavailable')}
                    </div>
                  </div>
                )}

                {viewMode === 'admin' && (
                  <div className="absolute top-4 right-4 flex gap-2">
                    <button
                      onClick={() => handleToggleAvailability(item.id)}
                      className={`p-2 rounded-full text-white transition-all shadow-md ${item.available ? 'bg-slate-600 hover:bg-slate-800' : 'bg-emerald-600 hover:bg-emerald-700'}`}
                      title={item.available ? t('markUnavailable') : t('markAvailable')}
                    >
                      {item.available ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                    <button 
                      onClick={() => { setSelectedItem(item); setEditItemModalOpen(true); }}
                      className="bg-blue-500 p-2 rounded-full text-white hover:bg-blue-700 transition-all shadow-md"
                      title={t('edit')}
                    >
                      <Pencil size={16} />
                    </button>
                    <button 
                      onClick={() => handleDeleteItem(item.id)}
                      className="bg-red-500 p-2 rounded-full text-white hover:bg-red-700 transition-all shadow-md"
                      title={t('delete')}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                )}
              </div>
              <div className="p-5 md:p-6 flex-1 flex flex-col">
                <div className="text-xs font-bold text-[#ecb282] uppercase tracking-widest mb-2">{item.category}</div>
                <h3 className="text-lg md:text-xl font-bold text-slate-800 dark:text-white mb-2 leading-tight">{item.name}</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm mb-6 flex-1 line-clamp-3 leading-relaxed break-words">{item.description}</p>
                <div className="flex items-center justify-between mt-auto pt-5 border-t border-slate-100 dark:border-slate-700">
                  <div className="text-xs font-medium text-slate-500 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded truncate max-w-[120px]">
                    {t('loc')}: {item.location}
                  </div>
                  {viewMode === 'public' && (
                    <Button 
                      onClick={() => { setSelectedItem(item); setBorrowModalOpen(true); }}
                      variant="primary"
                      className="text-sm px-5 py-2"
                      disabled={!item.available}
                    >
                      {item.available ? t('borrow') : t('unavailable')}
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>

        {borrowModalOpen && selectedItem && (
          <Modal onClose={() => setBorrowModalOpen(false)} title={`${t('borrowModalTitle')} - ${selectedItem.name}`}>
            <BorrowForm 
              item={selectedItem} 
              onSubmit={(className, reason) => {
                handleBorrow(selectedItem, className, reason);
                setBorrowModalOpen(false);
              }}
              onCancel={() => setBorrowModalOpen(false)}
              t={t}
            />
          </Modal>
        )}

        {addItemModalOpen && (
          <Modal onClose={() => setAddItemModalOpen(false)} title={t('addItem')}>
            <ItemForm 
              mode="add"
              onSubmit={(item) => {
                handleAddItem(item);
                setAddItemModalOpen(false);
              }}
              onCancel={() => setAddItemModalOpen(false)}
              t={t}
            />
          </Modal>
        )}

        {editItemModalOpen && selectedItem && (
          <Modal onClose={() => setEditItemModalOpen(false)} title={`${t('editItem')} - ${selectedItem.name}`}>
            <ItemForm 
              mode="edit"
              initialData={selectedItem}
              onSubmit={(updatedData) => {
                handleUpdateItem(selectedItem.id, updatedData);
                setEditItemModalOpen(false);
              }}
              onCancel={() => setEditItemModalOpen(false)}
              t={t}
            />
          </Modal>
        )}
      </div>
    );
  };

  const ReturnView = () => {
    const [searchClass, setSearchClass] = useState('');
    const [returnModalOpen, setReturnModalOpen] = useState(false);
    const [selectedLoan, setSelectedLoan] = useState(null);

    const safeActiveLoans = Array.isArray(activeLoans) ? activeLoans : [];

    const classLoans = safeActiveLoans.filter(l => 
      !searchClass || (l.className && l.className.trim().toLowerCase().includes(searchClass.trim().toLowerCase()))
    );

    return (
      <div className="space-y-8 font-sans pb-10 min-h-[60vh]">
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <h2 className="text-3xl font-bold text-slate-800 dark:text-white tracking-tight">{t('returnItem')}</h2>
          <p className="text-slate-500">{t('enterClassToReturn')}</p>
          
          <div className="relative">
            <Search className="absolute left-4 top-4 text-slate-400" size={20} />
            <input 
              type="text"
              value={searchClass}
              onChange={(e) => setSearchClass(e.target.value)}
              placeholder={t('classNamePlaceholder')}
              className="w-full pl-12 pr-5 py-4 text-lg rounded-2xl border-2 border-slate-200 dark:border-slate-600 focus:border-[#e93949] outline-none transition-all shadow-sm"
            />
          </div>
        </div>
        
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          {classLoans.length === 0 ? (
            <div className="text-center py-20 bg-slate-50 dark:bg-slate-800/50 rounded-3xl border-2 border-dashed border-slate-200 dark:border-slate-700">
              <div className="w-20 h-20 bg-white dark:bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-300">
                <Box size={40} />
              </div>
              <h3 className="text-xl font-bold text-slate-700 dark:text-slate-300">{t('noItemsFound')}</h3>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {classLoans.map(loan => (
                <Card key={loan.id} className="flex flex-col hover:shadow-lg transition-shadow border-l-4 border-l-[#e93949]">
                  <div className="p-6 flex-1">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-xl font-bold text-slate-800 dark:text-white leading-tight break-words">{loan.itemName}</h3>
                    </div>
                    <div className="space-y-4 text-sm text-slate-600 dark:text-slate-400">
                      <div className="flex items-center gap-2">
                        <UserCircle size={16} /> <span className="font-semibold text-base">{loan.className}</span>
                      </div>
                      <div className="italic text-slate-500 pl-3 border-l-2 border-slate-200 dark:border-slate-600 break-words">
                        "{loan.reason}"
                      </div>
                      <div className="text-xs text-slate-400">
                        Borrowed: {new Date(loan.borrowDate).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                  <div className="p-4 bg-slate-50 dark:bg-slate-900/50 border-t border-slate-100 dark:border-slate-700">
                    <Button 
                      onClick={() => { setSelectedLoan(loan); setReturnModalOpen(true); }}
                      variant="primary"
                      className="w-full"
                    >
                      {t('return')}
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>

        {returnModalOpen && selectedLoan && (
          <Modal onClose={() => setReturnModalOpen(false)} title={`${t('returnModalTitle')} - ${selectedLoan.itemName}`}>
            <ReturnForm 
              loan={selectedLoan}
              onSubmit={(story, image) => {
                handleReturn(selectedLoan, story, image);
                setReturnModalOpen(false);
              }}
              onCancel={() => setReturnModalOpen(false)}
              t={t}
            />
          </Modal>
        )}
      </div>
    );
  };

  const ActivityLogView = () => {
    const safeLogs = Array.isArray(logs) ? logs : [];

    return (
      <div className="space-y-8 font-sans pb-10">
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-bold text-slate-800 dark:text-white tracking-tight">{t('activityLog')}</h2>
          {viewMode === 'admin' && (
            <Button onClick={exportLogsToCSV} variant="outline" icon={FileSpreadsheet} className="text-sm">
              {t('exportCSV')}
            </Button>
          )}
        </div>
        <Card className="overflow-hidden border-0 shadow-lg">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-600 dark:text-slate-400">
              <thead className="bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-bold uppercase tracking-wider text-xs border-b border-slate-200 dark:border-slate-700">
                <tr>
                  <th className="p-5 whitespace-nowrap">Date</th>
                  <th className="p-5">User / Class</th>
                  <th className="p-5">Action</th>
                  <th className="p-5">Item</th>
                  <th className="p-5 min-w-[200px]">Details/Story</th>
                  <th className="p-5">Photo</th>
                  {viewMode === 'admin' && <th className="p-5">Admin</th>}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-700 bg-white dark:bg-slate-900/50">
                {safeLogs.length > 0 ? safeLogs.map(log => (
                  <tr key={log.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/80 transition-colors">
                    <td className="p-5 whitespace-nowrap font-medium align-top">{new Date(log.date).toLocaleDateString()}</td>
                    <td className="p-5 align-top">
                      <div className="font-bold text-slate-900 dark:text-white break-words max-w-[150px]">{log.userName}</div>
                      <div className="text-xs text-slate-400 uppercase tracking-wide mt-0.5">{log.userRole}</div>
                    </td>
                    <td className="p-5 align-top">
                      <Badge color={
                        (log.action || '').includes('borrow') ? 'amber' : 
                        (log.action || '').includes('return') ? 'emerald' : 
                        (log.action || '').includes('delete') ? 'red' : 'slate'
                      }>
                        {(log.action || 'Unknown').toUpperCase()}
                      </Badge>
                    </td>
                    <td className="p-5 align-top">
                      <span className="font-bold text-slate-800 dark:text-white break-words">{log.itemName}</span>
                    </td>
                    <td className="p-5 italic text-slate-500 break-words align-top">
                      {log.note || '-'}
                    </td>
                    <td className="p-5 align-top">
                      {log.imageUrl ? (
                        <div className="w-12 h-12 rounded-lg overflow-hidden bg-slate-100 border border-slate-200">
                          <img src={log.imageUrl} alt="Return Proof" className="w-full h-full object-cover" />
                        </div>
                      ) : '-'}
                    </td>
                    {viewMode === 'admin' && (
                      <td className="p-5 align-top">
                        <button 
                          onClick={() => handleDeleteLog(log.id)}
                          className="text-red-400 hover:text-red-600 p-1 hover:bg-red-50 rounded"
                          title={t('delete')}
                        >
                          <Trash2 size={16} />
                        </button>
                      </td>
                    )}
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={7} className="p-8 text-center">
                      {t('noActivity')}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    );
  };

  const AdminView = () => {
    const [newUser, setNewUser] = useState({ name: '', username: '', password: '', role: 'volunteer' });

    const clearData = () => {
      if(window.confirm("Are you sure? This will reset all inventory and logs.")) {
        setInventory(INITIAL_INVENTORY);
        setLogs([]);
        setActiveLoans([]);
        addNotification("success", "System reset to default state.");
      }
    };

    const handleAddUser = () => {
      if (!newUser.name || !newUser.username || !newUser.password) return;
      const user = { id: Date.now().toString(), ...newUser };
      setUsers(prev => [...(Array.isArray(prev) ? prev : []), user]);
      setNewUser({ name: '', username: '', password: '', role: 'volunteer' });
      addNotification('success', t('userAdded'));
    };

    const handleDeleteUser = (userId) => {
      if (window.confirm(t('confirmDelete'))) {
        setUsers(prev => (Array.isArray(prev) ? prev : []).filter(u => u.id !== userId));
      }
    };

    const safeUsers = Array.isArray(users) ? users : [];

    return (
      <div className="space-y-8 font-sans pb-10">
        <h2 className="text-3xl font-bold text-slate-800 dark:text-white tracking-tight">{t('adminSettings')}</h2>
        
        <div className="grid grid-cols-1 gap-8">
          <Card className="p-8">
            <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-6 flex items-center gap-3">
              <Palette size={24} className="text-[#e93949]" /> {t('landingBg')}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5 block">{t('bgColor')}</label>
                <div className="flex items-center gap-3">
                  <input 
                    type="color" 
                    value={landingBgColor || "#ffffff"}
                    onChange={(e) => setLandingBgColor(e.target.value)}
                    className="h-12 w-12 rounded border border-slate-300 cursor-pointer"
                  />
                  <button onClick={() => setLandingBgColor("")} className="text-sm text-red-500 underline">Reset</button>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5 block">{t('bgImage')}</label>
                <div className="p-4 bg-slate-100 dark:bg-slate-700 rounded-lg border-2 border-dashed border-slate-300 dark:border-slate-600 hover:border-[#e93949] transition-colors relative">
                  <input 
                    type="file" 
                    accept="image/*"
                    onChange={handleBgImageUpload}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <div className="flex flex-col items-center justify-center gap-2">
                    {landingBgImage ? (
                      <div className="flex items-center gap-2 text-emerald-500 font-medium">
                        <CheckCircle size={16} /> Image Set
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 text-slate-500">
                        <Upload size={16} /> Upload Image
                      </div>
                    )}
                    <button
                      onClick={(e) => { e.preventDefault(); setLandingBgImage(""); }}
                      className="text-xs text-red-500 z-10 underline"
                    >
                      Clear Image
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="p-8 h-fit">
              <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-6 flex items-center gap-3">
                <Settings size={24} className="text-[#e93949]" /> {t('sysConfig')}
              </h3>
              <div className="space-y-6">
                <div className="space-y-6">
                  <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider">{t('appearance')}</h4>
                  <Input 
                    label={t('organization')} 
                    value={orgName} 
                    onChange={(e) => setOrgName(e.target.value)}
                    placeholder={t('orgNameDefault')}
                  />
                  <div>
                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5 block">{t('logoUpload')}</label>
                    <div className="p-4 bg-slate-100 dark:bg-slate-700 rounded-lg border-2 border-dashed border-slate-300 dark:border-slate-600 hover:border-[#e93949] transition-colors relative">
                      <input 
                        type="file" 
                        accept="image/*"
                        onChange={handleLogoUpload}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      />
                      <div className="flex flex-col items-center justify-center gap-2">
                        {appLogo ? (
                          <img src={appLogo} alt="Logo Preview" className="max-h-24 object-contain mb-2" />
                        ) : (
                          <BrandLogo size="large" />
                        )}
                        <p className="text-xs text-slate-500 text-center">{t('logoInfo')}</p>
                      </div>
                    </div>
                    <div className="mt-2 text-center">
                      <button
                        onClick={handleResetLogo}
                        className="text-xs text-red-500 underline hover:text-red-700 flex items-center justify-center gap-1 mx-auto"
                      >
                        <RefreshCcw size={12} /> {t('resetLogo')}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-200 dark:border-slate-700">
                  <h4 className="text-sm font-bold text-red-500 mb-4 uppercase tracking-wider">{t('dangerZone')}</h4>
                  <Button variant="danger" onClick={clearData} icon={RotateCcw}>{t('resetSystem')}</Button>
                </div>
              </div>
            </Card>

            <Card className="p-8 h-fit">
              <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-6 flex items-center gap-3">
                <Users size={24} className="text-blue-600" /> {t('userMgmt')}
              </h3>
              
              {currentUser?.role === 'admin' && (
                <div className="mb-8 p-4 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 space-y-3">
                  <h4 className="font-bold text-sm text-slate-500 uppercase">{t('addUser')}</h4>
                  <Input placeholder="Name" value={newUser.name} onChange={e => setNewUser({...newUser, name: e.target.value})} />
                  <Input placeholder={t('username')} value={newUser.username} onChange={e => setNewUser({...newUser, username: e.target.value})} />
                  <Input type="password" placeholder={t('password')} value={newUser.password} onChange={e => setNewUser({...newUser, password: e.target.value})} />
                  <select 
                    value={newUser.role} 
                    onChange={e => setNewUser({...newUser, role: e.target.value})}
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                  >
                    <option value="volunteer">{t('volunteer')}</option>
                    <option value="admin">{t('admin')}</option>
                  </select>
                  <Button onClick={handleAddUser} className="w-full" icon={Plus}>{t('addUser')}</Button>
                </div>
              )}

              <div className="space-y-3">
                {safeUsers.map(u => (
                  <div key={u.id} className="flex items-center justify-between p-3 rounded-lg bg-slate-50 dark:bg-slate-700/30 border border-slate-100 dark:border-slate-700">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#ecb282] flex items-center justify-center text-white font-bold text-xs">
                        {u.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-bold text-sm text-slate-900 dark:text-white">{u.name}</div>
                        <div className="text-xs text-slate-500 uppercase">{t(u.role)}</div>
                      </div>
                    </div>
                    {currentUser?.role === 'admin' && u.id !== currentUser.id && (
                      <button
                        onClick={() => handleDeleteUser(u.id)}
                        className="text-red-400 hover:text-red-600"
                      >
                        <Trash2 size={16} />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>

        {passwordModalOpen && <ChangePasswordModal onClose={() => setPasswordModalOpen(false)} />}
      </div>
    );
  };

  const DashboardView = () => {
    const safeInventory = Array.isArray(inventory) ? inventory : [];
    const safeLoans = Array.isArray(activeLoans) ? activeLoans : [];
    const safeLogs = Array.isArray(logs) ? logs : [];

    const totalItems = safeInventory.reduce((sum, item) => sum + (item.quantity || 0), 0);
    const itemsBorrowed = safeLoans.length;

    const recent = safeLogs.slice(0, 5);

    return (
      <div className="space-y-8 pb-10">
        <h2 className="text-3xl font-bold text-slate-800 dark:text-white tracking-tight">{t('dashboard')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6 flex items-center justify-between">
            <div>
              <div className="text-sm text-slate-500">{t('totalStock')}</div>
              <AutoScaleText text={totalItems} className="mt-2" />
            </div>
            <div className="w-12 h-12 rounded-full bg-[#e93949]/10 flex items-center justify-center">
              <Box size={24} className="text-[#e93949]" />
            </div>
          </Card>
          <Card className="p-6 flex items-center justify-between">
            <div>
              <div className="text-sm text-slate-500">{t('itemsOut')}</div>
              <AutoScaleText text={itemsBorrowed} className="mt-2" />
            </div>
            <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center">
              <History size={24} className="text-amber-600" />
            </div>
          </Card>
          <Card className="p-6 flex items-center justify-between">
            <div>
              <div className="text-sm text-slate-500">Users</div>
              <AutoScaleText text={(Array.isArray(users) ? users : []).length} className="mt-2" />
            </div>
            <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center">
              <Users size={24} className="text-emerald-600" />
            </div>
          </Card>
        </div>

        <Card className="p-6">
          <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
            <History size={18} /> {t('recentActivity')}
          </h3>
          {recent.length === 0 ? (
            <div className="text-sm text-slate-500">{t('noActivity')}</div>
          ) : (
            <div className="space-y-3">
              {recent.map(log => (
                <div key={log.id} className="flex items-start justify-between text-sm">
                  <div>
                    <div className="font-semibold text-slate-800 dark:text-white">
                      {log.userName} <span className="text-slate-400">({log.userRole})</span>
                    </div>
                    <div className="text-slate-500">
                      {log.action} – {log.itemName}
                    </div>
                    {log.note && <div className="text-xs text-slate-400 mt-1 line-clamp-2">{log.note}</div>}
                  </div>
                  <div className="text-xs text-slate-400 whitespace-nowrap ml-4">
                    {new Date(log.date).toLocaleDateString()}
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>
    );
  };

  // --- MAIN RENDER ---

  if (viewMode === 'landing') {
    return <LandingView />;
  }

  const renderContent = () => {
    if (viewMode === 'public') {
      if (activeTab === 'return') return <ReturnView />;
      return <InventoryView />;
    }
    // admin
    switch (activeTab) {
      case 'dashboard': return <DashboardView />;
      case 'inventory': return <InventoryView />;
      case 'return': return <ReturnView />;
      case 'activity': return <ActivityLogView />;
      case 'admin': return <AdminView />;
      default: return <DashboardView />;
    }
  };

  const navItemsPublic = [
    { id: 'inventory', label: t('inventory'), icon: Package },
    { id: 'return', label: t('returnItem'), icon: RotateCcw },
  ] as const;

  const navItemsAdmin = [
    { id: 'dashboard', label: t('dashboard'), icon: LayoutDashboard },
    { id: 'inventory', label: t('inventory'), icon: Package },
    { id: 'return', label: t('returnItem'), icon: RotateCcw },
    { id: 'activity', label: t('activityLog'), icon: History },
    { id: 'admin', label: t('adminSettings'), icon: Settings },
  ] as const;

  const navItems = viewMode === 'admin' ? navItemsAdmin : navItemsPublic;

  return (
    <div className="min-h-screen flex bg-slate-100 dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-sans">
      {/* Sidebar */}
      <aside className="w-64 hidden md:flex flex-col bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800">
        <div className="px-6 py-5 border-b border-slate-200 dark:border-slate-800 flex items-center gap-3">
          <BrandLogo />
          <div>
            <div className="text-xs uppercase tracking-widest text-[#ecb282] font-bold">RENOVA</div>
            <div className="font-bold text-slate-800 dark:text-white truncate max-w-[10rem]">{getOrgName()}</div>
          </div>
        </div>
        <nav className="flex-1 px-3 py-4 space-y-1">
          {navItems.map(item => {
            const Icon = item.icon;
            const active = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id as any)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  active
                    ? 'bg-[#e93949] text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <Icon size={18} />
                <span className="truncate">{item.label}</span>
              </button>
            );
          })}
        </nav>
        <div className="border-t border-slate-200 dark:border-slate-800 p-3 flex items-center justify-between">
          <button
            onClick={() => setDarkMode(d => !d)}
            className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 hover:text-[#e93949]"
          >
            {darkMode ? <Sun size={16} /> : <Moon size={16} />}
            {darkMode ? 'Light' : 'Dark'}
          </button>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 hover:text-red-500"
          >
            <LogOut size={16} /> {t('logout')}
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col">
        {/* Top bar (mobile + title) */}
        <header className="md:hidden flex items-center justify-between px-4 py-3 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <BrandLogo />
            <div>
              <div className="text-xs uppercase tracking-widest text-[#ecb282] font-bold">RENOVA</div>
              <div className="font-bold text-slate-800 dark:text-white text-sm truncate max-w-[9rem]">
                {getOrgName()}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setDarkMode(d => !d)}
              className="p-2 rounded-full text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button
              onClick={handleLogout}
              className="p-2 rounded-full text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <LogOut size={18} />
            </button>
          </div>
        </header>

        {/* Mobile nav */}
        <div className="md:hidden flex gap-2 px-4 py-2 bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
          {navItems.map(item => {
            const Icon = item.icon;
            const active = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id as any)}
                className={`flex-1 flex items-center justify-center gap-2 px-2 py-2 rounded-lg text-xs font-medium transition-all ${
                  active
                    ? 'bg-[#e93949] text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <Icon size={16} />
                <span className="truncate">{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* Content */}
        <main className="flex-1 px-4 md:px-8 py-6 md:py-8 overflow-y-auto">
          {renderContent()}
        </main>
      </div>

      {/* Notifications */}
      <div className="fixed bottom-4 right-4 space-y-2 z-[9999]">
        {notifications.map(n => (
          <div
            key={n.id}
            className={`px-4 py-3 rounded-xl shadow-lg text-sm flex items-center gap-2 ${
              n.type === 'success'
                ? 'bg-emerald-50 text-emerald-700 border border-emerald-100'
                : 'bg-red-50 text-red-700 border border-red-100'
            }`}
          >
            {n.type === 'success' ? <CheckCircle size={16} /> : <AlertCircle size={16} />}
            <span>{n.message}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// Wrap core in ErrorBoundary
export default function RenovaApp() {
  return (
    <ErrorBoundary>
      <RenovaCore />
    </ErrorBoundary>
  );
}
