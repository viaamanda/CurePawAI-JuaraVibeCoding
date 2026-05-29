import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  PawPrint,
  Check,
  User,
  Lock,
  Mail,
  ArrowRight,
  ArrowLeft,
  Heart,
  Sparkles,
  Clock,
  TrendingUp,
  Brain,
  Activity,
  Award,
  CircleAlert,
  Calendar,
  ShieldAlert,
  CheckCircle2,
  Droplet,
  Trash2,
  AlertTriangle,
  RefreshCw
} from 'lucide-react';

// Define Types
type PetType = 'kucing' | 'anjing';

interface UserProfile {
  name: string;
  email: string;
  isRegistered: boolean;
}

interface PetProfile {
  type: PetType;
  name: string;
  age: string;
  ageUnit: 'years' | 'months';
  weight: string;
  breed: string;
}

type FeatureType = 'feeding' | 'health' | 'behavior';

interface SmartFeedingInputs {
  activityLevel: 'aktif' | 'pasif' | 'hiperaktif';
  sleepDuration: 'kurang' | 'berlebih' | 'berubah';
}

interface HealthMonitoringInputs {
  eatingPattern: 'normal' | 'kurang' | 'berlebihan';
  hydration: 'kurang' | 'cukup';
  weightTrend: 'stabil' | 'naik' | 'turun';
  activityTrend: 'normal' | 'menurun';
  sleepQuality: 'stabil' | 'terganggu';
}

interface BehaviorStressInputs {
  activityLevel: 'aktif' | 'pasif' | 'hiperaktif';
  sleepDuration: 'kurang' | 'berlebih' | 'berubah';
  interactionBehavior: 'menyendiri' | 'agresif' | 'malas';
  eatingBehavior: 'turun' | 'naik' | 'normal';
  heartRate: number;
}

// Breeds suggestions list for high interactive experience
const CAT_BREEDS = ['Persian', 'Angora', 'Maine Coon', 'Domestic Short Hair', 'Siamese', 'Ragdoll', 'Bengal', 'British Shorthair'];
const DOG_BREEDS = ['Golden Retriever', 'Poodle', 'Pomeranian', 'Bulldog', 'Siberian Husky', 'Beagle', 'Shih Tzu', 'Chihuahua', 'German Shepherd'];

export default function App() {
  // Page Flow State: 1 to 6
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isRegistering, setIsRegistering] = useState<boolean>(false);
  
  // App States
  const [user, setUser] = useState<UserProfile>({
    name: 'Caregiver Paw',
    email: 'user@curepaw.com',
    isRegistered: false
  });
  
  const [loginEmail, setLoginEmail] = useState<string>('owner@cutebuddy.com');
  const [loginPassword, setLoginPassword] = useState<string>('password123');
  
  const [signUpName, setSignUpName] = useState<string>('');
  const [signUpEmail, setSignUpEmail] = useState<string>('');
  const [signUpPassword, setSignUpPassword] = useState<string>('');
  
  const [selectedPetType, setSelectedPetType] = useState<PetType | null>(null);
  
  const [petProfile, setPetProfile] = useState<PetProfile>({
    type: 'kucing',
    name: '',
    age: '',
    ageUnit: 'years',
    weight: '',
    breed: ''
  });
  
  const [activeFeature, setActiveFeature] = useState<FeatureType | null>(null);
  
  // Feature Form Inputs
  const [feedingInputs, setFeedingInputs] = useState<SmartFeedingInputs>({
    activityLevel: 'aktif',
    sleepDuration: 'berubah'
  });
  
  const [healthInputs, setHealthInputs] = useState<HealthMonitoringInputs>({
    eatingPattern: 'normal',
    hydration: 'cukup',
    weightTrend: 'stabil',
    activityTrend: 'normal',
    sleepQuality: 'stabil'
  });
  
  const [behaviorInputs, setBehaviorInputs] = useState<BehaviorStressInputs>({
    activityLevel: 'aktif',
    sleepDuration: 'berubah',
    interactionBehavior: 'malas',
    eatingBehavior: 'normal',
    heartRate: 110
  });

  // Validation/Helper state
  const [formError, setFormError] = useState<string>('');

  // Handle Login Event
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginEmail || !loginPassword) {
      setFormError('Silakan isi seluruh kolom email dan password.');
      return;
    }
    setFormError('');
    setUser({
      name: loginEmail.split('@')[0],
      email: loginEmail,
      isRegistered: true
    });
    setCurrentPage(2);
  };

  // Handle Register Event
  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!signUpName || !signUpEmail || !signUpPassword) {
      setFormError('Lengkapi semua data untuk mendaftar.');
      return;
    }
    setFormError('');
    setUser({
      name: signUpName,
      email: signUpEmail,
      isRegistered: true
    });
    setIsRegistering(false);
    setCurrentPage(2);
  };

  // Handle Mock Google Sign In
  const handleGoogleSignIn = () => {
    setUser({
      name: 'Google User',
      email: 'user.google@gmail.com',
      isRegistered: true
    });
    setCurrentPage(2);
  };

  // Handle Pet Selection
  const selectPetTypeHandler = (type: PetType) => {
    setSelectedPetType(type);
    setPetProfile(prev => ({ ...prev, type, breed: '' }));
    setCurrentPage(3);
  };

  // Handle Pet Identity Submission
  const handleIdentitySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!petProfile.name || !petProfile.age || !petProfile.weight || !petProfile.breed) {
      setFormError('Harap lengkapi semua identitas kesehatan hewan kesayangan Anda.');
      return;
    }
    setFormError('');
    setCurrentPage(4);
  };

  // Safe Navigation Handler
  const handleBack = () => {
    if (currentPage === 5) {
      setCurrentPage(4);
    } else if (currentPage === 4) {
      setCurrentPage(3);
    } else if (currentPage === 3) {
      setCurrentPage(2);
    } else if (currentPage === 2) {
      setCurrentPage(1);
    } else if (currentPage === 6) {
      setCurrentPage(4); // Back to Feature Dashboard
    }
  };

  // Dynamic Rule-Based Experts Analysis Results Generation
  const generateAIResults = () => {
    const pName = petProfile.name || 'Peliharaan Anda';
    const pType = petProfile.type === 'kucing' ? 'Kucing' : 'Anjing';
    const ageVal = petProfile.age;
    const ageUnitStr = petProfile.ageUnit === 'years' ? 'Tahun' : 'Bulan';
    const pWeight = petProfile.weight || '4';
    
    if (activeFeature === 'feeding') {
      const { activityLevel, sleepDuration } = feedingInputs;
      
      // Calculate estimated food portion
      let portion = 'sedang (70g - 90g)';
      let frequency = 3;
      let reason = '';
      
      // Determine portions based on profile indicators
      if (activityLevel === 'hiperaktif') {
        portion = 'porsi besar (100g - 120g)';
        frequency = 4;
        reason = 'membakar kalori yang sangat tinggi karena tingkahnya yang hiperaktif.';
      } else if (activityLevel === 'pasif') {
        portion = 'porsi kecil (50g - 65g)';
        frequency = 2;
        reason = 'memiliki metabolisme yang lebih lambat agar mencegah obesitas.';
      } else {
        portion = 'porsi sedang (75g - 85g)';
        frequency = 3;
        reason = 'memiliki tingkat aktivitas harian yang cukup berimbang.';
      }

      if (sleepDuration === 'kurang') {
        reason += ' Kurang tidur juga menyebabkan kadar gula darahnya tidak stabil, porsi sebaiknya dibagi lebih merata.';
      } else if (sleepDuration === 'berlebih') {
        reason += ' Tidur berlebih cenderung mengurangi pembakaran energi secara signifikan.';
      }

      const adviceList = [
        `Berikan makanan jenis ${pType === 'Kucing' ? 'Dry food tinggi protein & anti hairball' : 'Kibble bernutrisi dengan kalsium pertumbuhan'} secara konsisten pada jadwalnya.`,
        `Pecah sajian menjadi ${frequency} kali pemberian porsi kecil guna menjaga metabolisme lambungnya tetap stabil.`,
        `Gunakan puzzle feeder atau mainan interaktif agar ${pName} makan dengan tempo yang terkontrol, menghindari tersedak.`
      ];

      return {
        title: 'Smart Feeding Schedule Insight',
        headline: `${pName} membutuhkan makan ${frequency} kali sehari dengan ${portion}.`,
        insight: `Dengan umur ${ageVal} ${ageUnitStr} dan ras ${petProfile.breed}, ${pName} memiliki bobot ${pWeight} kg. Mengingat tingkat aktivitas ${pName} yang ${activityLevel}, ia ${reason}`,
        recommendations: adviceList
      };
    } 
    
    if (activeFeature === 'health') {
      const { eatingPattern, hydration, weightTrend, activityTrend, sleepQuality } = healthInputs;
      
      let healthStatus: 'Healthy' | 'Needs Attention' | 'Low Activity Warning' = 'Healthy';
      let statusColor = 'text-[#839958] bg-[#8FBC93]/30 border-[#8DBC93]';
      let healthInsight = '';
      let adviceList: string[] = [];

      // Evaluation Logic
      if (activityTrend === 'menurun' && eatingPattern === 'normal') {
        healthStatus = 'Low Activity Warning';
        statusColor = 'text-[#D3968C] bg-[#E9ACBB]/30 border-[#D3968C]';
        healthInsight = `${pName} menunjukkan penurunan tingkat keaktifan, meskipun pola makannya masih stabil. Keadaan ini biasa disebabkan kebosanan, nyeri sendi samar, atau awal mula lesu fisik.`;
        adviceList = [
          `Pastikan untuk memicu minatnya kembali dengan ruang gerak terbuka di dekat sinar matahari pagi yang hangat.`,
          `Lakukan pemeriksaan telapak kaki dan sendi kaki kiri-kanannya secara lembut guna mengantisipasi adanya duri atau memar.`,
          `Rencanakan pemeriksaan suhu tubuh secara mandiri di rumah jika penurunan aktivitas terus berjalan.`
        ];
      } else if (eatingPattern === 'kurang' || hydration === 'kurang' || sleepQuality === 'terganggu') {
        healthStatus = 'Needs Attention';
        statusColor = 'text-[#D3968C] bg-[#E9ACBB]/40 border-[#D3968C]';
        healthInsight = `${pName} mengalami penurunan pola makan dan hidrasi dalam beberapa hari terakhir. Keadaan ini dapat mengindikasikan ketidaknyamanan pencernaan atau indikasi dehidrasi ringan yang memerlukan pemantauan intensif.`;
        adviceList = [
          `Pastikan ketersediaan air minum bersih terus mengalir atau gunakan dispenser air hewan otomatis agar ${pName} terdorong untuk minum lebih sering.`,
          `Cobalah mencampur sedikit sediaan wet food (makanan basah beraroma gurih) guna memicu nafsu makan yang melemah.`,
          `Pastikan hidrasi tercukupi secara berkala dan pantau aktivitas biologis (urin/feses) serta energinya selama 24 jam ke depan.`
        ];
      } else {
        healthStatus = 'Healthy';
        statusColor = 'text-[#839958] bg-[#8FBC93]/55 border-[#839958]';
        healthInsight = `Kondisi klinis mandiri dari ${pName} berada dalam rentang optimal! Nafsu makan yang teratur, hidrasi cukup, dan berat badan yang stabil menunjukkan pemilik merawatnya dengan sangat berdedikasi.`;
        adviceList = [
          `Pertahankan jadwal pemberian makan dan pemenuhan nutrisi harian secara konsisten.`,
          `Berikan suplemen multivitamin bulanan sesuai berat badannya (${pWeight} kg) untuk memelihara kilau bulu indahnya.`,
          `Tetap jadwalkan grooming berkala guna menghindarkan bakteri kulit mengendap.`
        ];
      }

      return {
        title: 'Health Rate Assessment',
        status: healthStatus,
        statusColor: statusColor,
        headline: `Status Kesehatan: ${healthStatus}`,
        insight: healthInsight,
        recommendations: adviceList
      };
    }

    // AI Behavior & Stress Analysis
    if (activeFeature === 'behavior') {
      const { activityLevel, sleepDuration, interactionBehavior, eatingBehavior, heartRate } = behaviorInputs;
      
      let moodStatus: 'Happy' | 'Relaxed' | 'Mild Stress' | 'Anxious' = 'Relaxed';
      let moodColor = 'text-[#839958] bg-[#FCEBBF]/80 border-[#839958]';
      let aiInsight = '';
      let adviceList: string[] = [];

      // Assess physical variables
      const isHeartRateHigh = (petProfile.type === 'kucing' && heartRate > 190) || (petProfile.type === 'anjing' && heartRate > 130);
      const isHeartRateLow = (petProfile.type === 'kucing' && heartRate < 110) || (petProfile.type === 'anjing' && heartRate < 70);

      if (interactionBehavior === 'agresif' || isHeartRateHigh) {
        moodStatus = 'Anxious';
        moodColor = 'text-[#D3968C] bg-[#E9ACBB]/40 border-[#D3968C]';
        aiInsight = `${pName} menunjukkan tanda-tanda kecemasan (anxiety) atau teritorial reaktif yang kuat. Detak jantungnya saat ini mencapai ${heartRate} BPM, yang tergolong tinggi untuk metabolisme tubuhnya. Perubahan perilaku agresif mencirikan kecemasan tersembunyi yang mendalam.`;
        adviceList = [
          `Sediakan area istirahat yang beralaskan kain lembut di pojok sunyi ruangan tanpa gangguan suara bising (Safe Cave/Space).`,
          `Hindari kontak mata langsung secara paksa ketika ${pName} bersikap defensif. Berikan waktu meredam emosinya sendiri.`,
          `Pertimbangkan untuk memasang diffuser aromaterapi fungsional khusus hewan peliharaan (seperti firo hormon penenang cair).`
        ];
      } else if (interactionBehavior === 'menyendiri' || eatingBehavior === 'turun' || sleepDuration === 'berubah') {
        moodStatus = 'Mild Stress';
        moodColor = 'text-[#D3968C] bg-[#E9ACBB]/20 border-[#D3968C]';
        aiInsight = `${pName} menunjukkan penurunan keaktifan dan interaksi sosial yang terindikasi stres ringan selama 2 hari terakhir. Sering kali dipicu oleh perubahan furnitur ruangan, aroma asing, atau kedatangan penghuni rumah baru.`;
        adviceList = [
          `Disarankan meningkatkan kualitas aktivitas bermain secara privat selama 15 menit per hari menggunakan tali mainan kesayangannya.`,
          `Beri treats (permen/snack khusus pemicu endorfin) secara perlahan saat sedang menemaninya bersantai.`,
          `Ajak berkomunikasi dengan suara bernada rendah dan belaian berirama dari jidat mengarah ke punggung belakang.`
        ];
      } else if (activityLevel === 'aktif' || activityLevel === 'hiperaktif') {
        moodStatus = 'Happy';
        moodColor = 'text-[#839958] bg-[#8FBC93]/40 border-[#839958]';
        aiInsight = `${pName} terlihat sangat ceria, penuh penjelajahan positif, dan memiliki interaksi yang penuh kehangatan. Detak jantungnya stabil di angka ${heartRate} BPM.`;
        adviceList = [
          `Salurkan sisa energinya yang melimpah dengan memberikan mainan interaktif tangkap bola/tali berbulu.`,
          `Ajak jalan santai di pekarangan rumah saat pagi hari guna menyegarkan panca inderanya dari kebosanan indoor.`,
          `Dokumentasikan kebersamaan ceria dengannya, karena dia berada pada masa puncak kebahagiaan mental!`
        ];
      } else {
        moodStatus = 'Relaxed';
        moodColor = 'text-[#105666] bg-[#8FBC93]/25 border-[#105666]';
        aiInsight = `${pName} dalam kondisi psikologis yang sangat stabil, tenteram dan rileks. Ia menikmati ritme hidupnya dengan beristirahat secukupnya secara tenang.`;
        adviceList = [
          `Biarkan ia menikmati waktu rebahan santainya tanpa dibangunkan secara mendadak.`,
          `Tetap berikan usapan hangat pada telinga belakang sebagai ungkapan sayang pemilik secara konsisten.`,
          `Sediakan ventilasi udara segar yang sejuk di dekat karpet tempat tidurnya.`
        ];
      }

      return {
        title: 'AI Behavior & Stress Analysis Results',
        status: moodStatus,
        statusColor: moodColor,
        headline: `Analisis Mood: ${moodStatus}`,
        insight: aiInsight,
        recommendations: adviceList
      };
    }

    return {
      title: 'Analisis CurePaw AI',
      status: 'Ready',
      statusColor: 'bg-pastel-sand',
      headline: 'Data Berhasil Dinilai',
      insight: 'Analisis khusus untuk peliharaan Anda.',
      recommendations: []
    };
  };

  const currentResult = generateAIResults();

  return (
    <div className="min-h-screen bg-[#F7F4D5] font-sans flex flex-col antialiased">
      {/* HEADER BAR */}
      <header className="bg-[#105666] text-white py-4 px-4 md:px-8 shadow-lg flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <motion.div 
            whileHover={{ scale: 1.1, rotate: 12 }} 
            whileTap={{ scale: 0.95 }}
            className="p-2.5 bg-[#FCEBBF] rounded-full flex items-center justify-center cursor-pointer shadow-md"
          >
            <PawPrint className="w-6 h-6 text-[#105666] fill-[#105666]" />
          </motion.div>
          <div>
            <span className="font-display font-bold text-xl md:text-2xl tracking-tight block leading-none">
              CurePaw AI
            </span>
            <span className="text-[10px] md:text-xs text-[#E9ACBB] font-semibold block mt-1 tracking-wider uppercase">
              AI Pet Wellness Assistant
            </span>
          </div>
        </div>

        {/* Top Session Breadcrumb */}
        {user.isRegistered && (
          <div className="flex items-center gap-3 bg-white/10 border border-white/20 rounded-full pl-3.5 pr-1.5 py-1 text-xs shadow-inner">
            <span className="font-semibold text-white max-w-[80px] md:max-w-[150px] truncate">
              {user.name}'s Profile
            </span>
            <div className="w-8 h-8 rounded-full bg-[#E9ACBB] border-2 border-white shrink-0 shadow-sm" />
          </div>
        )}
      </header>

      {/* PROGRESS TRACKER */}
      {currentPage > 1 && (
        <div className="w-full max-w-4xl mx-auto px-4 pt-6">
          <div className="bg-white/95 border border-[#C9B297]/30 rounded-3xl p-3 md:p-4-5 p-4 flex items-center justify-between shadow-md">
            {[
              { num: 2, label: 'Type' },
              { num: 3, label: 'Identity' },
              { num: 4, label: 'Features' },
              { num: 5, label: 'Assessment' },
              { num: 6, label: 'AI Diagnosis' }
            ].map((step, idx) => (
              <React.Fragment key={step.num}>
                {idx > 0 && (
                  <div className={`flex-1 h-1 mx-2 rounded-full transition-all duration-300 ${
                    currentPage >= step.num ? 'bg-[#8FBC93]' : 'bg-[#C9B297]/35'
                  }`} />
                )}
                <div className="flex flex-col items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-display font-bold text-xs transition-all duration-300 ${
                    currentPage === step.num 
                      ? 'bg-[#105666] text-white ring-4 ring-[#E9ACBB]/40 shadow-sm' 
                      : currentPage > step.num 
                        ? 'bg-[#8FBC93] text-white' 
                        : 'bg-[#C9B297]/30 text-[#105666]/50'
                  }`}>
                    {currentPage > step.num ? <Check className="w-4 h-4" /> : step.num - 1}
                  </div>
                  <span className={`text-[10px] font-bold mt-1.5 tracking-tight hidden sm:block ${
                    currentPage === step.num ? 'text-[#105666]' : 'text-[#105666]/50'
                  }`}>
                    {step.label}
                  </span>
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>
      )}

      {/* CORE APP WRAPPER */}
      <main className="flex-1 max-w-4xl w-full mx-auto p-4 md:py-8 flex flex-col justify-center">
        <AnimatePresence mode="wait">
          
          {/* ========================================================== */}
          {/* HALAMAN 1: LOGIN USER / SIGN IN                           */}
          {/* ========================================================== */}
          {currentPage === 1 && (
            <motion.div
              key="login-page"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              className="w-full max-w-lg mx-auto bg-white rounded-3xl overflow-hidden shadow-xl border-b-8 border-[#105666] p-6 md:p-8"
            >
              <div className="text-center mb-6">
                <div className="inline-block p-3.5 bg-[#E9ACBB]/40 rounded-full mb-3 shadow-inner">
                  <PawPrint className="w-10 h-10 text-[#105666] fill-[#105666]" />
                </div>
                <h1 className="text-3xl font-display font-bold text-[#105666]">
                  CurePaw AI
                </h1>
                <p className="text-sm text-[#105666]/70 font-medium max-w-xs mx-auto mt-1">
                  Pantau & sayangi kesehatan hewan peliharaan harian dari mana saja
                </p>
              </div>

              {formError && (
                <div id="login-error-alert" className="mb-4 bg-[#E9ACBB]/30 border border-[#D3968C] rounded-xl p-3 flex items-start gap-2 text-xs text-[#D3968C] font-medium animate-bounce" style={{ animationDuration: '0.5s' }}>
                  <CircleAlert className="w-4 h-4 mt-0.5 shrink-0" />
                  <span>{formError}</span>
                </div>
              )}

              {!isRegistering ? (
                /* LOGIN FORM */
                <form onSubmit={handleLoginSubmit} className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-[#839958] block uppercase tracking-wide">
                      Email / Akun Pengguna
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                        <Mail className="w-4 h-4 text-[#105666]/55" />
                      </div>
                      <input
                        id="login-email-input"
                        type="email"
                        value={loginEmail}
                        onChange={(e) => setLoginEmail(e.target.value)}
                        placeholder="pemilik.lucu@gmail.com"
                        className="w-full pl-10 pr-4 py-3 bg-[#F7F4D5]/60 border-2 border-[#C9B297]/40 rounded-2xl focus:border-[#105666] focus:outline-none text-sm transition-all text-[#105666] placeholder-[#105666]/40 font-medium"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-[#839958] block uppercase tracking-wide">
                      Password
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                        <Lock className="w-4 h-4 text-[#105666]/55" />
                      </div>
                      <input
                        id="login-password-input"
                        type="password"
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                        placeholder="••••••••••••"
                        className="w-full pl-10 pr-4 py-3 bg-[#F7F4D5]/60 border-2 border-[#C9B297]/40 rounded-2xl focus:border-[#105666] focus:outline-none text-sm transition-all text-[#105666] placeholder-[#105666]/40 font-medium"
                      />
                    </div>
                  </div>

                  <button
                    id="login-submit-btn"
                    type="submit"
                    className="w-full py-4 bg-[#839958] text-white font-display font-medium rounded-3xl shadow-md hover:bg-[#105666] transition-all flex items-center justify-center gap-2 cursor-pointer mt-2 text-sm uppercase tracking-widest font-extrabold"
                  >
                    Masuk Ke Applet
                    <ArrowRight className="w-5 h-5" />
                  </button>

                  <div className="pt-2 text-center">
                    <p className="text-xs text-[#105666]/75 font-medium">
                      belum memiliki akun?{' '}
                      <button
                        id="switch-to-register-btn"
                        type="button"
                        onClick={() => {
                          setIsRegistering(true);
                          setFormError('');
                        }}
                        className="text-[#D3968C] hover:text-[#105666] font-bold underline transition-all bg-transparent border-none cursor-pointer p-0"
                      >
                        Sign in terlebih dahulu
                      </button>
                    </p>
                  </div>
                </form>
              ) : (
                /* REGISTER FORM */
                <form onSubmit={handleRegisterSubmit} className="space-y-3.5">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-[#839958] block uppercase tracking-wide">
                      Nama Pemilik (Owner Name)
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                        <User className="w-4 h-4 text-[#105666]/55" />
                      </div>
                      <input
                        id="register-name-input"
                        type="text"
                        value={signUpName}
                        onChange={(e) => setSignUpName(e.target.value)}
                        placeholder="Nama Lengkap Anda"
                        className="w-full pl-10 pr-4 py-2.5 bg-[#F7F4D5]/60 border-2 border-[#C9B297]/40 rounded-2xl focus:border-[#105666] focus:outline-none text-sm transition-all text-[#105666] placeholder-[#105666]/40 font-medium"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-[#839958] block uppercase tracking-wide">
                      Akun Google / Email Pengguna
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                        <Mail className="w-4 h-4 text-[#105666]/55" />
                      </div>
                      <input
                        id="register-email-input"
                        type="email"
                        value={signUpEmail}
                        onChange={(e) => setSignUpEmail(e.target.value)}
                        placeholder="contoh.email@gmail.com"
                        className="w-full pl-10 pr-4 py-2.5 bg-[#F7F4D5]/60 border-2 border-[#C9B297]/40 rounded-2xl focus:border-[#105666] focus:outline-none text-sm transition-all text-[#105666] placeholder-[#105666]/40 font-medium"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-[#839958] block uppercase tracking-wide">
                      Buat Password
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                        <Lock className="w-4 h-4 text-[#105666]/55" />
                      </div>
                      <input
                        id="register-password-input"
                        type="password"
                        value={signUpPassword}
                        onChange={(e) => setSignUpPassword(e.target.value)}
                        placeholder="Ketik password baru"
                        className="w-full pl-10 pr-4 py-2.5 bg-[#F7F4D5]/60 border-2 border-[#C9B297]/40 rounded-2xl focus:border-[#105666] focus:outline-none text-sm transition-all text-[#105666] placeholder-[#105666]/40 font-medium"
                      />
                    </div>
                  </div>

                  <button
                    id="register-submit-btn"
                    type="submit"
                    className="w-full py-3.5 bg-[#105666] text-white font-display font-bold rounded-3xl shadow-md hover:bg-[#839958] transition-all flex items-center justify-center gap-2 cursor-pointer uppercase tracking-widest text-sm"
                  >
                    Daftar Sekarang
                    <ArrowRight className="w-5 h-5" />
                  </button>

                  <div className="relative py-1">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-[#C9B297]/30" />
                    </div>
                    <div className="relative flex justify-center text-[10px] uppercase">
                      <span className="bg-white px-2 text-[#105666]/50 font-bold">Atau Pakai Google</span>
                    </div>
                  </div>

                  {/* Google Authenticator Quick Button */}
                  <button
                    id="google-signin-btn"
                    type="button"
                    onClick={handleGoogleSignIn}
                    className="w-full py-3 bg-white border-2 border-[#C9B297]/40 text-[#105666] font-bold rounded-2xl hover:bg-[#E9ACBB]/10 transition-all flex items-center justify-center gap-2 cursor-pointer text-xs shadow-sm"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24">
                      <path
                        fill="#EA4335"
                        d="M12 5.04c1.62 0 3.08.56 4.22 1.65l3.12-3.12C17.43 1.68 14.9 1 12 1 7.35 1 3.37 3.68 1.48 7.58l3.69 2.87C6.01 7.22 8.78 5.04 12 5.04z"
                      />
                      <path
                        fill="#4285F4"
                        d="M23.49 12.27c0-.81-.07-1.59-.2-2.36H12v4.47h6.44c-.28 1.47-1.11 2.71-2.36 3.55l3.66 2.84c2.14-1.97 3.37-4.87 3.37-8.5z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.17 14.82c-.23-.69-.36-1.43-.36-2.2s.13-1.51.36-2.2L1.48 7.55C.54 9.48 0 11.66 0 14c0 2.34.54 4.52 1.48 6.45l3.69-2.87c-.23-.69-.36-1.43-.36-2.2s.01-.26.36-.56z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 23c3.24 0 5.97-1.07 7.96-2.91l-3.66-2.84c-1.1.74-2.51 1.18-4.3 1.18-3.22 0-5.99-2.18-6.96-5.11l-3.69 2.87C3.37 20.32 7.35 23 12 23z"
                      />
                    </svg>
                    Daftar dengan Akun Google
                  </button>

                  <div className="text-center">
                    <button
                      id="back-to-login-btn"
                      type="button"
                      onClick={() => {
                        setIsRegistering(false);
                        setFormError('');
                      }}
                      className="text-xs text-[#105666]/65 hover:text-[#105666] hover:underline font-bold bg-transparent border-none cursor-pointer"
                    >
                      Kembali ke halaman masuk login
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          )}

          {/* ========================================================== */}
          {/* HALAMAN 2: PILIHAN HEWAN (KUCING VS ANJING)              */}
          {/* ========================================================== */}
          {currentPage === 2 && (
            <motion.div
              key="pet-selection-page"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full text-center"
            >
              <div className="mb-6 flex flex-col items-center">
                {/* Visual Paw print on top center */}
                <motion.div 
                  className="p-4 bg-[#E9ACBB] rounded-full shadow-lg border-2 border-[#D3968C] animate-bounce"
                  style={{ animationDuration: '3s' }}
                >
                  <PawPrint className="w-12 h-12 text-[#105666] fill-[#105666]" />
                </motion.div>
                <h2 className="text-3xl font-display font-bold text-[#105666] mt-4">
                  Pilih Hewan Peliharaan Anda
                </h2>
                <p className="text-sm text-[#105666]/70 max-w-sm mt-1">
                  Kami mengoptimalkan analisa berdasarkan kebutuhan biologis bawaan anjing atau kucing.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto mt-6">
                
                {/* COLUMN 1: KUCING */}
                <motion.button
                  id="select-cat-btn"
                  whileHover={{ scale: 1.04, y: -4 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => selectPetTypeHandler('kucing')}
                  className="bg-white border-4 border-[#E9ACBB] rounded-3xl p-6 md:p-8 text-center cursor-pointer shadow-md hover:shadow-xl transition-all relative overflow-hidden group focus:outline-none flex flex-col items-center"
                >
                  <div className="absolute top-0 right-0 w-16 h-16 bg-[#E9ACBB]/40 rounded-bl-full transition-transform group-hover:scale-125" />
                  
                  {/* Giant circular representation */}
                  <div className="w-24 h-24 rounded-full bg-[#E9ACBB]/50 flex items-center justify-center mb-4 group-hover:bg-[#E9ACBB] transition-colors">
                    <span className="text-5xl">🐱</span>
                  </div>

                  <h3 className="text-2xl font-display font-bold text-[#105666] leading-none">
                    Kucing / Cat
                  </h3>
                  <p className="text-xs text-[#105666]/60 font-medium mt-2 leading-relaxed max-w-[180px]">
                    Optimalkan analisis nutrisi kucing, aktivitas manjat, dan indikasi stres sembunyi.
                  </p>
                  
                  <span className="mt-5 px-4 py-1.5 bg-[#D3968C] text-white rounded-full text-xs font-bold uppercase tracking-wider group-hover:bg-[#105666] transition-colors">
                    Pilih Kucing
                  </span>
                </motion.button>

                {/* COLUMN 2: ANJING */}
                <motion.button
                  id="select-dog-btn"
                  whileHover={{ scale: 1.04, y: -4 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => selectPetTypeHandler('anjing')}
                  className="bg-white border-4 border-[#8FBC93] rounded-3xl p-6 md:p-8 text-center cursor-pointer shadow-md hover:shadow-xl transition-all relative overflow-hidden group focus:outline-none flex flex-col items-center"
                >
                  <div className="absolute top-0 right-0 w-16 h-16 bg-[#8FBC93]/40 rounded-bl-full transition-transform group-hover:scale-125" />
                  
                  <div className="w-24 h-24 rounded-full bg-[#8FBC93]/50 flex items-center justify-center mb-4 group-hover:bg-[#8FBC93] transition-colors">
                    <span className="text-5xl">🐶</span>
                  </div>

                  <h3 className="text-2xl font-display font-bold text-[#105666] leading-none">
                    Anjing / Dog
                  </h3>
                  <p className="text-xs text-[#105666]/60 font-medium mt-2 leading-relaxed max-w-[180px]">
                    Optimalkan takaran kalori lari pagi, evaluasi stress gonggongan, dan hidrasi sendi.
                  </p>

                  <span className="mt-5 px-4 py-1.5 bg-[#839958] text-white rounded-full text-xs font-bold uppercase tracking-wider group-hover:bg-[#105666] transition-colors">
                    Pilih Anjing
                  </span>
                </motion.button>
              </div>

              <div className="mt-10">
                <button
                  id="back-to-step1"
                  onClick={handleBack}
                  className="inline-flex items-center gap-2 text-xs font-bold text-[#105666]/70 hover:text-[#105666] cursor-pointer hover:underline"
                >
                  <ArrowLeft className="w-4 h-4" /> Kembali Ke Login Owner
                </button>
              </div>
            </motion.div>
          )}

          {/* ========================================================== */}
          {/* HALAMAN 3: IDENTITAS HEWAN (NAMA, UMUR, BERAT, RAS)       */}
          {/* ========================================================== */}
          {currentPage === 3 && (
            <motion.div
              key="pet-identity-page"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="w-full max-w-xl mx-auto bg-white rounded-3xl p-6 md:p-8 shadow-xl border-t-8"
              style={{ borderTopColor: selectedPetType === 'kucing' ? '#E9ACBB' : '#8FBC93' }}
            >
              <div className="flex items-center gap-3.5 border-b border-[#C9B297]/30 pb-4 mb-5">
                <span className="text-4xl bg-[#F7F4D5]/60 p-2 rounded-2xl block shadow-sm">
                  {selectedPetType === 'kucing' ? '🐱' : '🐶'}
                </span>
                <div>
                  <h3 className="text-2xl font-display font-bold text-[#105666]">
                    Identitas {selectedPetType === 'kucing' ? 'Kucing' : 'Anjing'} Kesayangan
                  </h3>
                  <p className="text-xs text-[#105666]/60 font-medium">
                    Masukkan info dasar biologis untuk diagnosis kustom presisi.
                  </p>
                </div>
              </div>

              {formError && (
                <div id="identity-error-alert" className="mb-4 bg-[#E9ACBB]/30 border border-[#D3968C] rounded-xl p-3 flex items-start gap-2 text-xs text-[#D3968C] font-medium animate-shake">
                  <span className="text-lg">⚠️</span>
                  <span>{formError}</span>
                </div>
              )}

              <form onSubmit={handleIdentitySubmit} className="space-y-4">
                
                {/* NAMA PET */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#105666] block uppercase tracking-wide">
                    Nama Peliharaan
                  </label>
                  <input
                    id="pet-name-input"
                    type="text"
                    required
                    placeholder={selectedPetType === 'kucing' ? 'Contoh: Kitty, Milo, Snowy' : 'Contoh: Buddy, Bruno, Rex'}
                    value={petProfile.name}
                    onChange={(e) => setPetProfile(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-4 py-2.5 bg-[#F7F4D5]/35 border-2 border-[#C9B297]/40 rounded-xl focus:border-[#105666] focus:outline-none text-sm font-semibold text-[#105666]"
                  />
                </div>

                {/* UMUR & UNIT */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#105666] block uppercase tracking-wide">
                    Umur Peliharaan
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      id="pet-age-input"
                      type="number"
                      step="any"
                      required
                      min="0.1"
                      placeholder="Contoh: 1, 2, 6"
                      value={petProfile.age}
                      onChange={(e) => setPetProfile(prev => ({ ...prev, age: e.target.value }))}
                      className="w-full px-4 py-2.5 bg-[#F7F4D5]/35 border-2 border-[#C9B297]/40 rounded-xl focus:border-[#105666] focus:outline-none text-sm font-semibold text-[#105666]"
                    />
                    <select
                      id="pet-age-unit-select"
                      value={petProfile.ageUnit}
                      onChange={(e) => setPetProfile(prev => ({ ...prev, ageUnit: e.target.value as 'years' | 'months' }))}
                      className="w-full px-4 py-2.5 bg-[#F7F4D5]/35 border-2 border-[#C9B297]/40 rounded-xl focus:border-[#105666] focus:outline-none text-sm font-semibold text-[#105666] cursor-pointer"
                    >
                      <option value="years">Tahun / Years</option>
                      <option value="months">Bulan / Months</option>
                    </select>
                  </div>
                </div>

                {/* BERAT BADAN */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#105666] block uppercase tracking-wide">
                    Berat Badan (kg)
                  </label>
                  <input
                    id="pet-weight-input"
                    type="number"
                    step="any"
                    required
                    min="0.1"
                    placeholder="Contoh: 4.5"
                    value={petProfile.weight}
                    onChange={(e) => setPetProfile(prev => ({ ...prev, weight: e.target.value }))}
                    className="w-full px-4 py-2.5 bg-[#F7F4D5]/35 border-2 border-[#C9B297]/40 rounded-xl focus:border-[#105666] focus:outline-none text-sm font-semibold text-[#105666]"
                  />
                </div>

                {/* RAS (BREED) WITH SUGGESTIONS */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#105666] block uppercase tracking-wide">
                    Ras Keturunan (Breed)
                  </label>
                  <input
                    id="pet-breed-input"
                    type="text"
                    required
                    placeholder="Contoh: Angora, Persian, Pomeranian"
                    value={petProfile.breed}
                    onChange={(e) => setPetProfile(prev => ({ ...prev, breed: e.target.value }))}
                    className="w-full px-4 py-2.5 bg-[#F7F4D5]/35 border-2 border-[#C9B297]/40 rounded-xl focus:border-[#105666] focus:outline-none text-sm font-semibold text-[#105666] mb-1"
                  />
                  
                  {/* Quick breeds suggestion tabs */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    <span className="text-[10px] text-[#105666]/50 self-center mr-1 font-bold">Rekomendasi ras:</span>
                    {(selectedPetType === 'kucing' ? CAT_BREEDS : DOG_BREEDS).slice(0, 5).map((breedStr) => (
                      <button
                        key={breedStr}
                        type="button"
                        onClick={() => setPetProfile(prev => ({ ...prev, breed: breedStr }))}
                        className="text-[10px] px-2.5 py-1 bg-[#F7F4D5] hover:bg-[#105666] hover:text-white rounded-full border border-[#C9B297]/45 font-semibold transition-all text-[#105666] cursor-pointer shadow-sm"
                      >
                        {breedStr}
                      </button>
                    ))}
                  </div>
                </div>

                {/* STEER BUTTONS */}
                <div className="grid grid-cols-2 gap-4 pt-4">
                  <button
                    id="identity-back-btn"
                    type="button"
                    onClick={handleBack}
                    className="py-3.5 border-2 border-[#C9B297] font-display font-semibold rounded-2xl text-[#105666] hover:bg-[#F7F4D5]/50 transition-all text-sm cursor-pointer flex items-center justify-center gap-1"
                  >
                    <ArrowLeft className="w-4 h-4" /> Balik
                  </button>
                  <button
                    id="identity-next-btn"
                    type="submit"
                    className="py-3.5 bg-[#839958] text-white font-display font-bold rounded-2xl hover:bg-[#105666] transition-all text-sm shadow-md cursor-pointer flex items-center justify-center gap-1.5 uppercase tracking-wider"
                  >
                    Selanjutnya <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            </motion.div>
          )}

          {/* ========================================================== */}
          {/* HALAMAN 4: DASHBOARD FITUR (3 PILIHAN KOLOM)               */}
          {/* ========================================================== */}
          {currentPage === 4 && (
            <motion.div
              key="feature-dashboard-page"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full"
            >
              <div className="text-center mb-8">
                <span className="text-xs bg-[#105666]/10 text-[#105666] px-3.5 py-1.5 rounded-full font-bold uppercase tracking-wider">
                  Menu Utama Fitur
                </span>
                <h2 className="text-3xl font-display font-bold text-[#105666] mt-3">
                  Daftar Alat Analisis CurePaw
                </h2>
                <p className="text-sm text-[#105666]/65 max-w-xl mx-auto mt-1 font-medium">
                  Pilihlah salah satu fitur di bawah ini untuk memulai pengujian status harian {petProfile.name || 'peliharaan Anda'} secara mendalam.
                </p>
              </div>

              {/* THREE COLUMNS GRID */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                {/* FEATURE 1: Smart Feeding Schedule */}
                <motion.div
                  id="feature-card-feeding"
                  whileHover={{ y: -6, scale: 1.02 }}
                  className="bg-white border-4 border-[#FCEBBF] rounded-3xl p-5 shadow-md flex flex-col justify-between"
                >
                  <div>
                    <div className="w-12 h-12 rounded-2xl bg-[#FCEBBF]/60 flex items-center justify-center mb-4 text-2xl shadow-sm">
                      🍲
                    </div>
                    <h3 className="text-lg font-display font-bold text-[#105666]">
                      Smart Feeding Schedule
                    </h3>
                    <p className="text-xs text-[#105666]/70 font-medium leading-relaxed mt-2">
                      Rensum jatah makan paling akurat sesuai energi kinetik harian, porsi ideal, dan pola tidur herwan demi menghindari obesitas mendadak.
                    </p>
                  </div>
                  
                  <div className="mt-5 pt-3 border-t border-[#FCEBBF]/30">
                    <button
                      id="choose-feeding-btn"
                      onClick={() => {
                        setActiveFeature('feeding');
                        setCurrentPage(5);
                      }}
                      className="w-full py-2.5 bg-[#105666] text-white text-xs font-bold rounded-xl hover:bg-[#839958] transition-all uppercase tracking-wider cursor-pointer shadow-sm"
                    >
                      Buka Fitur
                    </button>
                  </div>
                </motion.div>

                {/* FEATURE 2: Health Rate Monitoring */}
                <motion.div
                  id="feature-card-health"
                  whileHover={{ y: -6, scale: 1.02 }}
                  className="bg-white border-4 border-[#8FBC93] rounded-3xl p-5 shadow-md flex flex-col justify-between"
                >
                  <div>
                    <div className="w-12 h-12 rounded-2xl bg-[#8FBC93]/50 flex items-center justify-center mb-4 text-2xl shadow-sm">
                      🩺
                    </div>
                    <h3 className="text-lg font-display font-bold text-[#105666]">
                      Health Monitoring
                    </h3>
                    <p className="text-xs text-[#105666]/70 font-medium leading-relaxed mt-2">
                      Evaluasi trend bobot organ tubuh harian, pola serapan rehidrasi harian, kualitas tidur fisik, serta alarm dini sistem kekebalan badannya.
                    </p>
                  </div>

                  <div className="mt-5 pt-3 border-t border-[#8FBC93]/35">
                    <button
                      id="choose-health-btn"
                      onClick={() => {
                        setActiveFeature('health');
                        setCurrentPage(5);
                      }}
                      className="w-full py-2.5 bg-[#839958] text-white text-xs font-bold rounded-xl hover:bg-[#105666] transition-all uppercase tracking-wider cursor-pointer shadow-sm"
                    >
                      Buka Fitur
                    </button>
                  </div>
                </motion.div>

                {/* FEATURE 3: AI Behavior & Stress Analysis */}
                <motion.div
                  id="feature-card-behavior"
                  whileHover={{ y: -6, scale: 1.02 }}
                  className="bg-white border-4 border-[#E9ACBB] rounded-3xl p-5 shadow-md flex flex-col justify-between"
                >
                  <div>
                    <div className="w-12 h-12 rounded-2xl bg-[#E9ACBB]/55 flex items-center justify-center mb-4 text-2xl shadow-sm">
                      🧠
                    </div>
                    <h3 className="text-lg font-display font-bold text-[#105666]">
                      AI Behavior & Stress
                    </h3>
                    <p className="text-xs text-[#105666]/70 font-medium leading-relaxed mt-2">
                      Analisis level kegelisahan batin, kepekaan interaksi sosial, detak denyut jantung (heart rate), serta kestabilan psikologi umum hewan.
                    </p>
                  </div>

                  <div className="mt-5 pt-3 border-t border-[#E9ACBB]/35">
                    <button
                      id="choose-behavior-btn"
                      onClick={() => {
                        setActiveFeature('behavior');
                        setCurrentPage(5);
                      }}
                      className="w-full py-2.5 bg-[#D3968C] text-white text-xs font-bold rounded-xl hover:bg-[#105666] transition-all uppercase tracking-wider cursor-pointer shadow-sm"
                    >
                      Buka Fitur
                    </button>
                  </div>
                </motion.div>

              </div>

              {/* LOWER SWITCH BUTTONS & QUICK PROFILE CARD */}
              <div className="mt-8 bg-white border-2 border-[#C9B297]/30 rounded-3xl p-4.5 p-4 max-w-lg mx-auto flex items-center justify-between shadow-md">
                <div className="flex items-center gap-3">
                  <span className="text-2xl bg-[#F7F4D5] p-2 rounded-xl border border-[#C9B297]/20 shadow-inner">{petProfile.type === 'kucing' ? '🐱' : '🐶'}</span>
                  <div className="text-left">
                    <p className="text-sm font-bold text-[#105666]">{petProfile.name} ({petProfile.breed})</p>
                    <p className="text-[11px] text-[#105666]/70 font-medium">Umur: {petProfile.age} | Berat: {petProfile.weight} kg</p>
                  </div>
                </div>
                <button
                  id="change-pet-btn"
                  onClick={() => setCurrentPage(3)}
                  className="text-xs font-bold text-[#D3968C] hover:text-[#105666] hover:underline bg-transparent border-none cursor-pointer pr-1"
                >
                  Ganti Profil Hewan
                </button>
              </div>

              <div className="mt-8 text-center">
                <button
                  id="dashboard-back-btn"
                  onClick={handleBack}
                  className="inline-flex items-center gap-1.5 text-xs text-[#105666]/60 hover:text-[#105666] font-bold hover:underline cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" /> Kembali Pilih Jenis Hewan
                </button>
              </div>
            </motion.div>
          )}

          {/* ========================================================== */}
          {/* HALAMAN 5: CONDITIONAL FILLABLE COLUMNS BASED ON FEATURE    */}
          {/* ========================================================== */}
          {currentPage === 5 && (
            <motion.div
              key="feature-input-page"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              className="w-full max-w-xl mx-auto bg-white rounded-3xl p-6 md:p-8 shadow-xl border-t-8 border-[#105666]"
            >
              <div className="flex items-center gap-3.5 border-b border-[#C9B297]/30 pb-4 mb-5">
                <span className="text-3xl bg-[#F7F4D5] p-2 rounded-2xl border border-[#C9B297]/20 shadow-sm block">
                  {activeFeature === 'feeding' ? '🍲' : activeFeature === 'health' ? '🩺' : '🧠'}
                </span>
                <div>
                  <h3 className="text-xl font-display font-bold text-[#105666] leading-none">
                    {activeFeature === 'feeding' && 'Smart Feeding Form'}
                    {activeFeature === 'health' && 'Health Monitoring Form'}
                    {activeFeature === 'behavior' && 'Behavior & Stress Inputs'}
                  </h3>
                  <p className="text-[11px] text-[#105666]/60 font-medium mt-1.5">
                    Profil saat ini: <span className="font-bold text-[#105666]">{petProfile.name}</span> ({petProfile.type === 'kucing' ? 'Kucing' : 'Anjing'})
                  </p>
                </div>
              </div>

              {/* IF CHOSEN FITUR (a): SMART FEEDING SCHEDULE */}
              {activeFeature === 'feeding' && (
                <div className="space-y-4">
                  
                  {/* Prefilled Fields confirming basic info */}
                  <div className="grid grid-cols-3 gap-2.5 p-3.5 bg-[#F7F4D5]/70 rounded-2xl border border-[#C9B297]/30">
                    <div className="text-center">
                      <span className="text-[10px] text-[#105666]/55 block font-bold uppercase">Umur</span>
                      <span className="text-xs font-bold text-[#105666]">{petProfile.age} {petProfile.ageUnit === 'years' ? 'Thn' : 'Bln'}</span>
                    </div>
                    <div className="text-center border-x border-[#C9B297]/25">
                      <span className="text-[10px] text-[#105666]/55 block font-bold uppercase">Berat</span>
                      <span className="text-xs font-bold text-[#105666]">{petProfile.weight} Kg</span>
                    </div>
                    <div className="text-center">
                      <span className="text-[10px] text-[#105666]/55 block font-bold uppercase">Ras</span>
                      <span className="text-xs font-bold text-[#105666] truncate block max-w-[80px] mx-auto">{petProfile.breed}</span>
                    </div>
                  </div>

                  {/* Input 1: Activity Level */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-[#105666] block uppercase tracking-wide">
                      Tingkat Aktivitas (Activity Level)
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { val: 'aktif', label: 'Aktif / Active', desc: 'Suka lari & lompat' },
                        { val: 'pasif', label: 'Pasif / Passive', desc: 'Rebahaan & manja' },
                        { val: 'hiperaktif', label: 'Hiperaktif', desc: 'Bertenaga ekstra' }
                      ].map((act) => (
                        <button
                          key={act.val}
                          type="button"
                          id={`activity-${act.val}-btn`}
                          onClick={() => setFeedingInputs(prev => ({ ...prev, activityLevel: act.val as any }))}
                          className={`p-3 rounded-2xl border-2 text-center transition-all cursor-pointer flex flex-col items-center justify-center ${
                            feedingInputs.activityLevel === act.val 
                              ? 'bg-[#839958] text-white border-[#839958] shadow-sm font-bold' 
                              : 'bg-[#F7F4D5]/35 hover:bg-[#F7F4D5]/60 border-[#C9B297]/40 text-[#105666]'
                          }`}
                        >
                          <span className="text-xs font-bold block leading-tight">{act.label}</span>
                          <span className="text-[8px] opacity-75 mt-0.5 leading-none font-medium">{act.desc}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Input 2: Sleep Duration */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-[#105666] block uppercase tracking-wide">
                      Pola Durasi Tidur (Sleep Duration)
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                      {[
                        { val: 'kurang', label: 'Kurang Tidur', desc: 'Sering terbangun malam' },
                        { val: 'berlebih', label: 'Tidur Berlebih', desc: 'Sangat malas / selalu lelap' },
                        { val: 'berubah', label: 'Pola Berubah', desc: 'Pagi tidur malam terbangun' }
                      ].map((slp) => (
                        <button
                          key={slp.val}
                          type="button"
                          id={`sleep-${slp.val}-btn`}
                          onClick={() => setFeedingInputs(prev => ({ ...prev, sleepDuration: slp.val as any }))}
                          className={`p-3 rounded-2xl border-2 text-center transition-all cursor-pointer flex flex-col items-center justify-center ${
                            feedingInputs.sleepDuration === slp.val 
                              ? 'bg-[#105666] text-white border-[#105666] shadow-xs font-bold' 
                              : 'bg-[#F7F4D5]/35 hover:bg-[#F7F4D5]/60 border-[#C9B297]/40 text-[#105666]'
                          }`}
                        >
                          <span className="text-xs font-bold block leading-tight">{slp.label}</span>
                          <span className="text-[8px] opacity-75 mt-0.5 leading-none font-medium">{slp.desc}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* IF CHOSEN FITUR (b): HEALTH MONITORING */}
              {activeFeature === 'health' && (
                <div className="space-y-4">
                  
                  {/* Input 1: Eating Pattern */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-[#105666] block uppercase tracking-wide">
                      Pola Makan (Eating Pattern)
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { val: 'normal', emoji: '🥗', label: 'Normal' },
                        { val: 'kurang', emoji: '📉', label: 'Kurang / Less' },
                        { val: 'berlebihan', emoji: '📈', label: 'Berlebih' }
                      ].map((opt) => (
                        <button
                          key={opt.val}
                          type="button"
                          id={`eat-${opt.val}-btn`}
                          onClick={() => setHealthInputs(prev => ({ ...prev, eatingPattern: opt.val as any }))}
                          className={`p-2.5 rounded-2xl border-2 text-center cursor-pointer transition-all flex flex-col items-center ${
                            healthInputs.eatingPattern === opt.val
                              ? 'bg-[#839958] text-white border-[#839958]'
                              : 'bg-[#F7F4D5]/35 hover:bg-[#F7F4D5]/60 border-[#C9B297]/40 text-[#105666]'
                          }`}
                        >
                          <span className="text-base">{opt.emoji}</span>
                          <span className="text-xs font-bold mt-0.5">{opt.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Input 2: Hydration status */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-[#105666] block uppercase tracking-wide">
                      Kadar Hidrasi (Hydration)
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { val: 'kurang', label: 'Kurang / Dehidrasi', reason: 'Jarang menyentuh mangkok air' },
                        { val: 'cukup', label: 'Cukup / Optimal', reason: 'Tingkat asupan air seimbang' }
                      ].map((opt) => (
                        <button
                          key={opt.val}
                          type="button"
                          id={`hydr-${opt.val}-btn`}
                          onClick={() => setHealthInputs(prev => ({ ...prev, hydration: opt.val as any }))}
                          className={`p-3 rounded-2xl border-2 text-left cursor-pointer transition-all flex items-start gap-2.5 ${
                            healthInputs.hydration === opt.val
                              ? 'bg-[#105666] text-white border-[#105666]'
                              : 'bg-[#F7F4D5]/35 hover:bg-[#F7F4D5]/60 border-[#C9B297]/40 text-[#105666]'
                          }`}
                        >
                          <div className={`w-3.5 h-3.5 rounded-full mt-0.5 border flex items-center justify-center shrink-0 ${
                            healthInputs.hydration === opt.val ? 'bg-[#E9ACBB]' : 'bg-transparent border-[#C9B297]'
                          }`} />
                          <div>
                            <span className="text-xs font-bold block">{opt.label}</span>
                            <span className="text-[8px] opacity-75 block font-medium">{opt.reason}</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Row of dropdown indicators - Weight, Activity, Sleep */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                    
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-[#839958] block uppercase">Trend Berat Badan</label>
                      <select
                        id="health-weight-trend-select"
                        value={healthInputs.weightTrend}
                        onChange={(e) => setHealthInputs(prev => ({ ...prev, weightTrend: e.target.value as any }))}
                        className="w-full px-3 py-2.5 bg-[#F7F4D5]/40 border-2 border-[#C9B297]/40 rounded-xl text-xs font-semibold text-[#105666]"
                      >
                        <option value="stabil">Stabil / Stable</option>
                        <option value="naik">Naik / Gaining</option>
                        <option value="turun">Turun / Losing</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-[#839958] block uppercase">Trend Aktivitas</label>
                      <select
                        id="health-activity-trend-select"
                        value={healthInputs.activityTrend}
                        onChange={(e) => setHealthInputs(prev => ({ ...prev, activityTrend: e.target.value as any }))}
                        className="w-full px-3 py-2.5 bg-[#F7F4D5]/40 border-2 border-[#C9B297]/40 rounded-xl text-xs font-semibold text-[#105666]"
                      >
                        <option value="normal">Normal / Aktif</option>
                        <option value="menurun">Menurun / Drop</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-[#839958] block uppercase">Kualitas Tidur</label>
                      <select
                        id="health-sleep-quality-select"
                        value={healthInputs.sleepQuality}
                        onChange={(e) => setHealthInputs(prev => ({ ...prev, sleepQuality: e.target.value as any }))}
                        className="w-full px-3 py-2.5 bg-[#F7F4D5]/40 border-2 border-[#C9B297]/40 rounded-xl text-xs font-semibold text-[#105666]"
                      >
                        <option value="stabil">Stabil / Tenang</option>
                        <option value="terganggu">Terganggu / Gelisah</option>
                      </select>
                    </div>

                  </div>
                </div>
              )}

              {/* IF CHOSEN FITUR (c): AI BEHAVIOR & STRESS ANALYSIS */}
              {activeFeature === 'behavior' && (
                <div className="space-y-4">
                  
                  {/* Grid for Activity level & sleep duration */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-[#839958] block uppercase tracking-wide">Tingkat Aktivitas</label>
                      <div className="flex flex-col gap-1.5">
                        {['aktif', 'pasif', 'hiperaktif'].map((val) => (
                          <button
                            key={val}
                            type="button"
                            onClick={() => setBehaviorInputs(prev => ({ ...prev, activityLevel: val as any }))}
                            className={`px-3 py-2.5 rounded-xl text-left border text-xs font-semibold transition-all ${
                              behaviorInputs.activityLevel === val
                                ? 'bg-[#839958] text-white border-[#839958]'
                                : 'bg-[#F7F4D5]/35 text-[#105666] hover:bg-[#F7F4D5]/60 border-[#C9B297]/40'
                            }`}
                          >
                            {val === 'aktif' && '✨ Aktif (Active)'}
                            {val === 'pasif' && '💤 Pasif (Passive)'}
                            {val === 'hiperaktif' && '⚡ Hiperaktif'}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-[#839958] block uppercase tracking-wide">Durasi Tidur</label>
                      <div className="flex flex-col gap-1.5">
                        {['kurang', 'berlebih', 'berubah'].map((val) => (
                          <button
                            key={val}
                            type="button"
                            onClick={() => setBehaviorInputs(prev => ({ ...prev, sleepDuration: val as any }))}
                            className={`px-3 py-2.5 rounded-xl text-left border text-xs font-semibold transition-all ${
                              behaviorInputs.sleepDuration === val
                                ? 'bg-[#105666] text-white border-[#105666]'
                                : 'bg-[#F7F4D5]/35 text-[#105666] hover:bg-[#F7F4D5]/60 border-[#C9B297]/40'
                            }`}
                          >
                            {val === 'kurang' && '⏰ Kurang Tidur'}
                            {val === 'berlebih' && '👑 Tidur Berlebihan'}
                            {val === 'berubah' && '🌐 Perubahan Pola'}
                          </button>
                        ))}
                      </div>
                    </div>

                  </div>

                  {/* Input 3: Interaction behavior */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-[#105666] block uppercase tracking-wide">
                      Perilaku Interaksi Sosial (Interaction Behavior)
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { val: 'menyendiri', label: 'Menyendiri', desc: 'Sembunyi / Soliter' },
                        { val: 'agresif', label: 'Agresif / Reaktif', desc: 'Mengaum / Defensif' },
                        { val: 'malas', label: 'Malas Bermain', desc: 'Kurang bergairah' }
                      ].map((opt) => (
                        <button
                          key={opt.val}
                          type="button"
                          id={`inter-${opt.val}-btn`}
                          onClick={() => setBehaviorInputs(prev => ({ ...prev, interactionBehavior: opt.val as any }))}
                          className={`p-2.5 rounded-xl border-2 text-center cursor-pointer transition-all flex flex-col justify-center items-center ${
                            behaviorInputs.interactionBehavior === opt.val
                              ? 'bg-[#D3968C] text-white border-[#D3968C]'
                              : 'bg-[#F7F4D5]/35 hover:bg-[#F7F4D5]/60 border-[#C9B297]/40 text-[#105666]'
                          }`}
                        >
                          <span className="text-xs font-bold leading-tight">{opt.label}</span>
                          <span className="text-[7.5px] opacity-80 mt-0.5 leading-none font-medium">{opt.desc}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Row matching Eating behavior & Range scroll for Heart rate */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                    
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-[#105666] block uppercase tracking-wide">Nafsu Makan (Eating Behavior)</label>
                      <select
                        id="behavior-eating-select"
                        value={behaviorInputs.eatingBehavior}
                        onChange={(e) => setBehaviorInputs(prev => ({ ...prev, eatingBehavior: e.target.value as any }))}
                        className="w-full px-3 py-2.5 bg-[#F7F4D5]/40 border-2 border-[#C9B297]/40 rounded-xl text-xs font-semibold text-[#105666]"
                      >
                        <option value="normal">Makan Normal</option>
                        <option value="turun">Nafsu Makan Turun</option>
                        <option value="naik">Nafsu Makan Naik</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <div className="flex justify-between items-center">
                        <label className="text-[10px] font-bold text-[#105666] block uppercase tracking-wide">Denyut Jantung (Heart Rate)</label>
                        <span className="text-xs font-extrabold text-[#D3968C]">{behaviorInputs.heartRate} BPM</span>
                      </div>
                      <input
                        id="behavior-heartrate-input"
                        type="range"
                        min={petProfile.type === 'kucing' ? '90' : '50'}
                        max={petProfile.type === 'kucing' ? '240' : '160'}
                        value={behaviorInputs.heartRate}
                        onChange={(e) => setBehaviorInputs(prev => ({ ...prev, heartRate: parseInt(e.target.value) }))}
                        className="w-full h-1.5 bg-[#F7F4D5] rounded-lg appearance-none cursor-pointer accent-[#D3968C] border border-[#C9B297]/30"
                      />
                      <div className="flex justify-between text-[8px] text-[#105666]/55 font-bold">
                        <span>Min: {petProfile.type === 'kucing' ? '90' : '50'}</span>
                        <span>Rentang Normal: {petProfile.type === 'kucing' ? '120-220' : '70-120'}</span>
                        <span>Max: {petProfile.type === 'kucing' ? '240' : '160'}</span>
                      </div>
                    </div>

                  </div>

                </div>
              )}

              {/* ACTION CONTROL BUTTONS */}
              <div className="grid grid-cols-2 gap-4 mt-8 pt-4 border-t border-[#C9B297]/25">
                <button
                  id="feature-back-btn"
                  onClick={handleBack}
                  className="py-3.5 border-2 border-[#C9B297] font-display font-semibold rounded-2xl text-[#105666] hover:bg-[#F7F4D5]/50 transition-all text-sm cursor-pointer flex items-center justify-center gap-1"
                >
                  <ArrowLeft className="w-4 h-4" /> Balik Dashboard
                </button>
                <button
                  id="generate-analysis-btn"
                  onClick={() => setCurrentPage(6)}
                  className="py-3.5 bg-[#D3968C] text-white font-display font-bold rounded-2xl hover:bg-[#105666] transition-all text-sm shadow-md cursor-pointer flex items-center justify-center gap-1.5 uppercase tracking-wider"
                >
                  <Sparkles className="w-4 h-4 text-[#FCEBBF] fill-[#FCEBBF]" /> Mulai Analisis AI
                </button>
              </div>

            </motion.div>
          )}

          {/* ========================================================== */}
          {/* HALAMAN 6: HASIL DIAGNOSIS / OUTPUT FITUR                 */}
          {/* ========================================================== */}
          {currentPage === 6 && (
            <motion.div
              key="analysis-result-page"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-2xl mx-auto"
            >
              <div className="bg-white rounded-3xl overflow-hidden shadow-2xl border-t-8 border-[#105666] p-5 md:p-8 relative">
                
                {/* Visual Top Decorative badge */}
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#105666] text-white px-6 py-2.5 rounded-full font-display font-bold text-xs shadow-md flex items-center gap-2 uppercase tracking-wide">
                  <Award className="w-4 h-4 text-[#FCEBBF] fill-[#FCEBBF]" />
                  CurePaw Diagnosis Online
                </div>

                {/* HEADER INFO PREVIEW */}
                <div className="flex justify-between items-start mt-4 bg-[#F7F4D5]/60 p-3.5 rounded-2xl gap-3 border border-[#C9B297]/30">
                  <div className="flex items-center gap-3">
                    <span className="text-4xl bg-white p-2 rounded-2xl shadow-sm border border-[#C9B297]/20">
                      {petProfile.type === 'kucing' ? '🐱' : '🐶'}
                    </span>
                    <div>
                      <h4 className="font-display font-extrabold text-lg text-[#105666] leading-none">{petProfile.name}</h4>
                      <p className="text-xs text-[#105666]/70 font-bold mt-1.5">Ras: {petProfile.breed} • {petProfile.age} {petProfile.ageUnit === 'years' ? 'Tahun' : 'Bulan'}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-[#839958] bg-[#8FBC93]/25 border border-[#839958]/30 font-extrabold px-3 py-1 rounded-full uppercase tracking-wider block shadow-sm">
                      Bobot: {petProfile.weight} KG
                    </span>
                    <span className="text-[9px] text-[#105666]/60 font-bold block mt-1.5 uppercase">Diperiksa: {new Date().toLocaleDateString('id-ID')}</span>
                  </div>
                </div>

                {/* CORE EVALUATION RESULT CARD CONTAINER */}
                <div className="mt-6 space-y-4">
                  
                  {/* Title of specific analysis category */}
                  <div className="flex items-center gap-2.5">
                    <span className="w-2.5 h-6 bg-[#D3968C] rounded-full" />
                    <h3 className="font-display font-bold text-xl text-[#105666]">
                      {currentResult.title}
                    </h3>
                  </div>

                  {/* Badges indicators for Health / Mood */}
                  {activeFeature === 'health' && (
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-[#105666]/70">Tingkat Ancaman:</span>
                      <span className={`text-xs font-bold border rounded-full px-3.5 py-1 ${currentResult.statusColor}`}>
                        {currentResult.status}
                      </span>
                    </div>
                  )}

                  {activeFeature === 'behavior' && (
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-[#105666]/70">Status Emosi Lahiriah:</span>
                      <span className={`text-xs font-extrabold border rounded-full px-3.5 py-1 uppercase ${currentResult.statusColor}`}>
                        {currentResult.status} Mood
                      </span>
                    </div>
                  )}

                  {/* Highlights section */}
                  <div className="bg-[#FCEBBF]/40 border-2 border-[#FCEBBF] rounded-2xl p-4 md:p-5 shadow-sm">
                    <h5 className="text-xs font-extrabold text-[#839958] uppercase tracking-wide">AI Recommendation Headline:</h5>
                    <p className="font-display font-bold text-base md:text-lg text-[#105666] mt-1.5 leading-relaxed italic">
                      " {currentResult.headline} "
                    </p>
                  </div>

                  {/* Clinical Insight Paragraph */}
                  <div className="space-y-1 bg-[#F7F4D5]/35 p-4 rounded-2xl border border-[#C9B297]/25">
                    <h5 className="text-[10px] font-extrabold text-[#105666] uppercase tracking-wide">Penelusuran Diagnostik AI:</h5>
                    <p className="text-xs md:text-sm text-[#105666]/90 leading-relaxed font-medium">
                      {currentResult.insight}
                    </p>
                  </div>

                  {/* Actionable recommendations lists */}
                  <div className="space-y-2">
                    <h5 className="text-[10px] font-extrabold text-[#105666] uppercase tracking-wide">Panduan Penanganan / Recommendations:</h5>
                    <div className="space-y-2">
                      {currentResult.recommendations?.map((rec, i) => (
                        <div key={i} className="flex gap-2.5 items-start bg-[#8FBC93]/10 hover:bg-[#8FBC93]/20 border border-[#8FBC93]/35 p-3 rounded-xl transition-colors">
                          <CheckCircle2 className="w-4 h-4 text-[#839958] mt-0.5 shrink-0 animate-pulse" />
                          <span className="text-xs md:text-sm text-[#105666]/90 leading-tight font-medium">
                            {rec}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>

                {/* BOTTOM DISCLAIMERS */}
                <div className="mt-8 bg-[#E9ACBB]/15 p-3.5 rounded-2xl border border-[#D3968C]/25 flex gap-2.5 items-start text-[10px] text-[#105666]/85">
                  <ShieldAlert className="w-4 h-4 text-[#D3968C] shrink-0 mt-0.5" />
                  <p className="leading-relaxed">
                    <strong>Pemberitahuan:</strong> Analisis CurePaw AI bersifat anjuran berdasarkan asupan parameter harian. Diagnosis ini tidak menggantikan konsultasi ahli medis dokter hewan (Vet practitioner) berlisensi resmi.
                  </p>
                </div>

                {/* CONTROL ACTION STEER */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mt-8 pt-5 border-t border-[#C9B297]/25">
                  <button
                    id="result-back-dashboard"
                    onClick={() => setCurrentPage(4)}
                    className="py-3.5 border-2 border-[#C9B297] font-display font-semibold rounded-2xl text-[#105666] hover:bg-[#F7F4D5]/50 transition-all text-xs cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <ArrowLeft className="w-4 h-4" /> Buka Menu Fitur Lain
                  </button>
                  <button
                    id="result-re-evaluate"
                    onClick={() => setCurrentPage(5)}
                    className="py-3.5 bg-[#105666] text-white font-display font-bold rounded-2xl hover:bg-[#839958] transition-all text-xs shadow-md cursor-pointer flex items-center justify-center gap-1.5 uppercase tracking-wide"
                  >
                    <RefreshCw className="w-3.5 h-3.5" /> Ubah Parameter Halaman 5
                  </button>
                </div>

              </div>

              {/* Lower quick reset anchor */}
              <div className="mt-6 text-center">
                <button
                  id="reset-entire-flow"
                  onClick={() => {
                    setSelectedPetType(null);
                    setPetProfile({
                      type: 'kucing',
                      name: '',
                      age: '',
                      ageUnit: 'years',
                      weight: '',
                      breed: ''
                    });
                    setActiveFeature(null);
                    setCurrentPage(2);
                  }}
                  className="bg-white hover:bg-[#E9ACBB]/15 text-[#D3968C] border border-[#C9B297]/40 font-bold px-4 py-2.5 rounded-full text-xs transition-colors shadow-xs inline-flex items-center gap-1.5 cursor-pointer hover:border-[#D3968C]"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Bersihkan Data & Ulangi Dari Awal
                </button>
              </div>

            </motion.div>
          )}

        </AnimatePresence>
      </main>

      {/* FOOTER */}
      <footer className="py-6 text-center text-xs text-[#105666]/50 border-t border-[#C9B297]/25 mt-12 bg-[#105666]/5">
        <div className="flex justify-center items-center gap-1.5 font-display font-bold text-xs text-[#105666]/75">
          <span>© 2026 CurePaw AI</span>
          <span className="text-[#D3968C]">♥</span>
          <span>Peduli Kesehatan Hewan Kesayangan Anda</span>
        </div>
      </footer>
    </div>
  );
}
