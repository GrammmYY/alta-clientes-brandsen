import { useState } from 'react';
import { Wifi, Home, CreditCard, Phone, MapPin, Mail, Key, Camera, Upload, X, Check, ChevronDown, Zap, Shield, Clock } from 'lucide-react';

interface FormData {
  plan: string;
  direccion: string;
  barrio: string;
  localidad: string;
  email: string;
  ubicacion: string;
  claveWifi: string;
  telefono: string;
  metodoPago: string;
  numeroTarjeta: string;
  vencimiento: string;
  tipoTarjeta: string;
  banco: string;
  tvAdicionales: string;
}

interface Errors {
  [key: string]: string;
}

interface FilePreview {
  file: File;
  preview: string;
}

export default function FormularioAltaFibra(): JSX.Element {
  const [formData, setFormData] = useState<FormData>({
    plan: '',
    direccion: '',
    barrio: '',
    localidad: '',
    email: '',
    ubicacion: '',
    claveWifi: '',
    telefono: '',
    metodoPago: 'manual',
    numeroTarjeta: '',
    vencimiento: '',
    tipoTarjeta: '',
    banco: '',
    tvAdicionales: '0'
  });

  const [errors, setErrors] = useState<Errors>({});
  const [dniFrente, setDniFrente] = useState<FilePreview | null>(null);
  const [dniReverso, setDniReverso] = useState<FilePreview | null>(null);
  const [fotoVivienda, setFotoVivienda] = useState<FilePreview | null>(null);

  const planes = [
    { value: '50', label: '50 MEGAS', precio: 39360, popular: false },
    { value: '100', label: '100 MEGAS', precio: 44520, popular: true }
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, setter: (file: FilePreview | null) => void) => {
    const file = e.target.files?.[0];
    if (file) {
      const preview = URL.createObjectURL(file);
      setter({ file, preview });
    }
  };

  const removeFile = (setter: (file: FilePreview | null) => void, preview: string) => {
    URL.revokeObjectURL(preview);
    setter(null);
  };

  const validateForm = () => {
    const newErrors: Errors = {};
    if (!formData.plan) newErrors.plan = 'Seleccioná un plan';
    if (!formData.direccion) newErrors.direccion = 'Completá la dirección';
    if (!formData.barrio) newErrors.barrio = 'Completá el barrio';
    if (!formData.localidad) newErrors.localidad = 'Completá la localidad';
    if (!formData.email) newErrors.email = 'Completá el email';
    if (!formData.telefono) newErrors.telefono = 'Completá el teléfono';
    if (!formData.ubicacion) newErrors.ubicacion = 'Completá la ubicación';
    if (formData.claveWifi && formData.claveWifi.length < 10) newErrors.claveWifi = 'Mínimo 10 caracteres';
    if (formData.metodoPago === 'debito' && !formData.numeroTarjeta) newErrors.numeroTarjeta = 'Completá los datos de la tarjeta';
    if (!dniFrente) newErrors.dniFrente = 'Subí la foto del DNI frente';
    if (!dniReverso) newErrors.dniReverso = 'Subí la foto del DNI reverso';
    if (!fotoVivienda) newErrors.fotoVivienda = 'Subí la foto de la vivienda';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      alert('¡Solicitud enviada correctamente!');
    }
  };

  const calcularTotalConexion = () => {
    return 55000 + parseInt(formData.tvAdicionales || '0') * 10000;
  };

  const InputField = ({ label, name, type = 'text', placeholder, icon: Icon, required = false }: {
    label: string;
    name: keyof FormData;
    type?: string;
    placeholder: string;
    icon?: React.ComponentType<{ className?: string }>;
    required?: boolean;
  }) => (
    <div className="group">
      <label className="block text-sm font-medium text-slate-600 mb-2 group-focus-within:text-emerald-600 transition-colors">
        {Icon && <Icon className="w-4 h-4 inline mr-2 opacity-60" />}
        {label} {required && <span className="text-emerald-500">*</span>}
      </label>
      <input
        type={type}
        name={name}
        value={formData[name]}
        onChange={handleChange}
        className="w-full px-4 py-3.5 bg-white border-2 border-slate-200 rounded-xl 
                   focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 
                   transition-all duration-200 outline-none
                   placeholder:text-slate-400 text-slate-800"
        placeholder={placeholder}
      />
      {errors[name] && (
        <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
          <span className="w-1 h-1 bg-red-500 rounded-full"></span>
          {errors[name]}
        </p>
      )}
    </div>
  );

  const FileUpload = ({ label, file, setFile, error }: {
    label: string;
    file: FilePreview | null;
    setFile: (file: FilePreview | null) => void;
    error?: string;
  }) => (
    <div>
      <label className="block text-sm font-medium text-slate-600 mb-2">{label} <span className="text-emerald-500">*</span></label>
      {!file ? (
        <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-slate-300 rounded-2xl cursor-pointer hover:border-emerald-400 hover:bg-emerald-50/50 transition-all duration-300 bg-white">
          <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center mb-3 group-hover:bg-emerald-100 transition-colors">
            <Upload className="w-6 h-6 text-slate-400" />
          </div>
          <span className="text-sm font-medium text-slate-600">Subir foto</span>
          <span className="text-xs text-slate-400 mt-1">JPG/PNG máx 5MB</span>
          <input type="file" accept="image/*" onChange={(e) => handleFileChange(e, setFile)} className="hidden" />
        </label>
      ) : (
        <div className="relative group">
          <img src={file.preview} alt={label} className="w-full h-48 object-cover rounded-2xl border-2 border-emerald-200" />
          <button 
            type="button"
            onClick={() => removeFile(setFile, file.preview)} 
            className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 shadow-lg transition-all opacity-0 group-hover:opacity-100"
          >
            <X className="w-4 h-4" />
          </button>
          <div className="absolute bottom-2 left-2 bg-emerald-500 text-white px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
            <Check className="w-3 h-3" /> Cargado
          </div>
        </div>
      )}
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50/30">
      {/* Decorative Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-emerald-400/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 -left-40 w-80 h-80 bg-cyan-400/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-emerald-300/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-3xl mx-auto px-4 py-8 md:py-12">
        
        {/* Header */}
        <header className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-emerald-500/10 text-emerald-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Wifi className="w-4 h-4" />
            Brandsen Digital
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 tracking-tight">
            Solicitud de Alta
          </h1>
          <p className="text-xl text-slate-600 font-light">
            Fibra Óptica al Hogar
          </p>
        </header>

        {/* Info Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10">
          {[
            { icon: Zap, label: 'Conexión', value: '$55.000' },
            { icon: Check, label: 'Incluye', value: '1 TV + ONU' },
            { icon: Clock, label: 'Instalación', value: 'Lun a Vie' },
            { icon: Shield, label: 'TV Extra', value: '$10K + $1K/mes' },
          ].map((item, i) => (
            <div key={i} className="bg-white/80 backdrop-blur-sm border border-slate-200/60 rounded-2xl p-4 text-center hover:shadow-lg hover:border-emerald-200 transition-all duration-300">
              <item.icon className="w-5 h-5 text-emerald-500 mx-auto mb-2" />
              <p className="text-xs text-slate-500 mb-1">{item.label}</p>
              <p className="font-bold text-slate-800 text-sm">{item.value}</p>
            </div>
          ))}
        </div>

        {/* Main Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Section 1: Plan Selection */}
          <section className="bg-white rounded-3xl border border-slate-200/60 shadow-xl shadow-slate-200/50 overflow-hidden">
            <div className="bg-gradient-to-r from-emerald-500 to-cyan-500 p-6">
              <h2 className="text-xl font-bold text-white flex items-center gap-3">
                <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                  <Wifi className="w-5 h-5" />
                </div>
                Elegí tu Plan
              </h2>
            </div>
            
            <div className="p-6 space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                {planes.map(plan => (
                  <label 
                    key={plan.value} 
                    className={`relative flex flex-col p-6 border-2 rounded-2xl cursor-pointer transition-all duration-300 hover:shadow-lg
                      ${formData.plan === plan.value 
                        ? 'border-emerald-500 bg-emerald-50/50 shadow-lg shadow-emerald-500/10' 
                        : 'border-slate-200 hover:border-emerald-300 bg-white'}`}
                  >
                    {plan.popular && (
                      <span className="absolute -top-3 right-4 bg-gradient-to-r from-amber-400 to-orange-400 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                        POPULAR
                      </span>
                    )}
                    <input
                      type="radio"
                      name="plan"
                      value={plan.value}
                      checked={formData.plan === plan.value}
                      onChange={handleChange}
                      className="sr-only"
                    />
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <span className="text-3xl font-black text-slate-900">{plan.value}</span>
                        <span className="text-lg font-medium text-slate-600 ml-1">MB</span>
                      </div>
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all
                        ${formData.plan === plan.value ? 'border-emerald-500 bg-emerald-500' : 'border-slate-300'}`}>
                        {formData.plan === plan.value && <Check className="w-4 h-4 text-white" />}
                      </div>
                    </div>
                    <p className="text-sm text-slate-500 mb-3">Hasta {plan.value} Megas + 1 TV</p>
                    <p className="text-2xl font-bold text-emerald-600">
                      ${plan.precio.toLocaleString()}
                      <span className="text-sm font-normal text-slate-500">/mes</span>
                    </p>
                  </label>
                ))}
              </div>
              {errors.plan && <p className="text-red-500 text-sm">{errors.plan}</p>}

              <div className="pt-4 border-t border-slate-100">
                <label className="block text-sm font-medium text-slate-600 mb-2">
                  ¿TVs adicionales?
                </label>
                <div className="relative">
                  <select
                    name="tvAdicionales"
                    value={formData.tvAdicionales}
                    onChange={handleChange}
                    className="w-full px-4 py-3.5 bg-slate-50 border-2 border-slate-200 rounded-xl 
                             appearance-none cursor-pointer
                             focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 
                             transition-all duration-200 outline-none text-slate-800"
                  >
                    {[0, 1, 2, 3, 4, 5].map(num => (
                      <option key={num} value={num}>
                        {num === 0 ? 'Sin TVs adicionales' : `${num} TV${num > 1 ? 's' : ''} adicional${num > 1 ? 'es' : ''}`}
                        {num > 0 && ` (+$${(num * 10000).toLocaleString()} único + $${(num * 1000).toLocaleString()}/mes)`}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
                </div>
              </div>
            </div>
          </section>

          {/* Section 2: Address */}
          <section className="bg-white rounded-3xl border border-slate-200/60 shadow-xl shadow-slate-200/50 overflow-hidden">
            <div className="bg-gradient-to-r from-slate-700 to-slate-800 p-6">
              <h2 className="text-xl font-bold text-white flex items-center gap-3">
                <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                  <Home className="w-5 h-5" />
                </div>
                Domicilio de Instalación
              </h2>
            </div>
            
            <div className="p-6">
              <div className="grid md:grid-cols-2 gap-5">
                <InputField label="Dirección" name="direccion" placeholder="Av. San Martín 1234" icon={MapPin} required />
                <InputField label="Barrio" name="barrio" placeholder="Centro" required />
                <InputField label="Localidad" name="localidad" placeholder="Brandsen" required />
                <InputField label="Ubicación Google Maps" name="ubicacion" placeholder="Link de Google Maps" icon={MapPin} required />
              </div>
            </div>
          </section>

          {/* Section 3: Contact */}
          <section className="bg-white rounded-3xl border border-slate-200/60 shadow-xl shadow-slate-200/50 overflow-hidden">
            <div className="bg-gradient-to-r from-cyan-500 to-blue-500 p-6">
              <h2 className="text-xl font-bold text-white flex items-center gap-3">
                <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                  <Phone className="w-5 h-5" />
                </div>
                Datos de Contacto
              </h2>
            </div>
            
            <div className="p-6">
              <div className="grid md:grid-cols-2 gap-5">
                <InputField label="Teléfono" name="telefono" type="tel" placeholder="11 1234-5678" icon={Phone} required />
                <InputField label="Email" name="email" type="email" placeholder="tu@email.com" icon={Mail} required />
              </div>
            </div>
          </section>

          {/* Section 4: Photos */}
          <section className="bg-white rounded-3xl border border-slate-200/60 shadow-xl shadow-slate-200/50 overflow-hidden">
            <div className="bg-gradient-to-r from-rose-500 to-pink-500 p-6">
              <h2 className="text-xl font-bold text-white flex items-center gap-3">
                <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                  <Camera className="w-5 h-5" />
                </div>
                Documentación Requerida
              </h2>
            </div>
            
            <div className="p-6">
              <div className="grid md:grid-cols-2 gap-5">
                <FileUpload label="DNI - Frente" file={dniFrente} setFile={setDniFrente} error={errors.dniFrente} />
                <FileUpload label="DNI - Reverso" file={dniReverso} setFile={setDniReverso} error={errors.dniReverso} />
                <div className="md:col-span-2">
                  <FileUpload label="Foto de la Vivienda (fachada)" file={fotoVivienda} setFile={setFotoVivienda} error={errors.fotoVivienda} />
                </div>
              </div>
            </div>
          </section>

          {/* Section 5: WiFi Config */}
          <section className="bg-white rounded-3xl border border-slate-200/60 shadow-xl shadow-slate-200/50 overflow-hidden">
            <div className="bg-gradient-to-r from-violet-500 to-purple-500 p-6">
              <h2 className="text-xl font-bold text-white flex items-center gap-3">
                <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                  <Key className="w-5 h-5" />
                </div>
                Configuración WiFi
              </h2>
            </div>
            
            <div className="p-6">
              <InputField 
                label="Clave WiFi" 
                name="claveWifi" 
                placeholder="MiClave2025ABC (mínimo 10 caracteres)" 
                icon={Key} 
              />
              <p className="text-xs text-slate-500 mt-3 flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-amber-400 rounded-full"></span>
                Esta clave quedará asignada al equipo. El cambio posterior tiene costo.
              </p>
            </div>
          </section>

          {/* Section 6: Payment */}
          <section className="bg-white rounded-3xl border border-slate-200/60 shadow-xl shadow-slate-200/50 overflow-hidden">
            <div className="bg-gradient-to-r from-amber-500 to-orange-500 p-6">
              <h2 className="text-xl font-bold text-white flex items-center gap-3">
                <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                  <CreditCard className="w-5 h-5" />
                </div>
                Forma de Pago Mensual
              </h2>
            </div>
            
            <div className="p-6 space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  { value: 'manual', label: 'Pago Manual', desc: 'Transferencia / Efectivo' },
                  { value: 'debito', label: 'Débito Automático', desc: 'Tarjeta Crédito/Débito' }
                ].map(option => (
                  <label
                    key={option.value}
                    className={`flex items-center gap-4 p-5 border-2 rounded-2xl cursor-pointer transition-all duration-300
                      ${formData.metodoPago === option.value 
                        ? 'border-amber-500 bg-amber-50/50' 
                        : 'border-slate-200 hover:border-amber-300'}`}
                  >
                    <input
                      type="radio"
                      name="metodoPago"
                      value={option.value}
                      checked={formData.metodoPago === option.value}
                      onChange={handleChange}
                      className="sr-only"
                    />
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all
                      ${formData.metodoPago === option.value ? 'border-amber-500 bg-amber-500' : 'border-slate-300'}`}>
                      {formData.metodoPago === option.value && <Check className="w-3 h-3 text-white" />}
                    </div>
                    <div>
                      <p className="font-semibold text-slate-800">{option.label}</p>
                      <p className="text-sm text-slate-500">{option.desc}</p>
                    </div>
                  </label>
                ))}
              </div>

              {formData.metodoPago === 'debito' && (
                <div className="bg-slate-50 rounded-2xl p-6 space-y-5 mt-4 border border-slate-200">
                  <div>
                    <label className="block text-sm font-medium text-slate-600 mb-2">
                      Número de Tarjeta *
                    </label>
                    <input
                      type="text"
                      name="numeroTarjeta"
                      value={formData.numeroTarjeta}
                      onChange={handleChange}
                      className="w-full px-4 py-3.5 bg-white border-2 border-slate-200 rounded-xl 
                               focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10 
                               transition-all duration-200 outline-none font-mono tracking-wider"
                      placeholder="1234 5678 9012 3456"
                      maxLength={19}
                    />
                    {errors.numeroTarjeta && <p className="text-red-500 text-sm mt-2">{errors.numeroTarjeta}</p>}
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-600 mb-2">Vencimiento</label>
                      <input
                        type="text"
                        name="vencimiento"
                        value={formData.vencimiento}
                        onChange={handleChange}
                        className="w-full px-4 py-3.5 bg-white border-2 border-slate-200 rounded-xl 
                                 focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10 
                                 transition-all duration-200 outline-none text-center font-mono"
                        placeholder="MM/AA"
                        maxLength={5}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-600 mb-2">Tipo</label>
                      <select
                        name="tipoTarjeta"
                        value={formData.tipoTarjeta}
                        onChange={handleChange}
                        className="w-full px-4 py-3.5 bg-white border-2 border-slate-200 rounded-xl 
                                 focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10 
                                 transition-all duration-200 outline-none"
                      >
                        <option value="">Tipo...</option>
                        <option value="debito">Débito</option>
                        <option value="credito">Crédito</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-600 mb-2">Banco</label>
                      <input
                        type="text"
                        name="banco"
                        value={formData.banco}
                        onChange={handleChange}
                        className="w-full px-4 py-3.5 bg-white border-2 border-slate-200 rounded-xl 
                                 focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10 
                                 transition-all duration-200 outline-none"
                        placeholder="Banco"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* Summary */}
          {formData.plan && (
            <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-3xl p-8 text-white overflow-hidden relative">
              <div className="absolute top-0 right-0 w-40 h-40 bg-emerald-500/20 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-cyan-500/20 rounded-full blur-3xl"></div>
              
              <div className="relative">
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <Check className="w-6 h-6 text-emerald-400" />
                  Resumen de tu Solicitud
                </h3>
                
                <div className="space-y-4 text-sm">
                  <div className="flex justify-between items-center py-3 border-b border-white/10">
                    <span className="text-slate-400">Plan seleccionado</span>
                    <span className="font-bold text-lg">{formData.plan} MEGAS + 1TV</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-white/10">
                    <span className="text-slate-400">Derecho a conexión</span>
                    <span className="font-semibold">$55.000</span>
                  </div>
                  {parseInt(formData.tvAdicionales) > 0 && (
                    <div className="flex justify-between items-center py-3 border-b border-white/10">
                      <span className="text-slate-400">TV adicionales ({formData.tvAdicionales})</span>
                      <span className="font-semibold">${(parseInt(formData.tvAdicionales) * 10000).toLocaleString()}</span>
                    </div>
                  )}
                  <div className="flex justify-between items-center pt-4">
                    <span className="text-lg font-medium">Total a Abonar</span>
                    <span className="text-3xl font-black text-emerald-400">
                      ${calcularTotalConexion().toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-emerald-500 via-emerald-500 to-cyan-500 text-white py-5 rounded-2xl font-bold text-lg 
                     hover:shadow-2xl hover:shadow-emerald-500/30 hover:-translate-y-1
                     active:translate-y-0 transition-all duration-300
                     flex items-center justify-center gap-3"
          >
            <Zap className="w-6 h-6" />
            Enviar Solicitud de Alta
          </button>

          <p className="text-center text-sm text-slate-500 px-4">
            Al enviar, aceptás los términos y condiciones. 
            Recibirás un Alias para abonar el derecho a conexión.
          </p>
        </form>

        {/* Footer Steps */}
        <div className="mt-10 bg-white rounded-3xl border border-slate-200/60 shadow-xl shadow-slate-200/50 p-8">
          <h3 className="font-bold text-slate-800 mb-6 text-lg">Próximos Pasos</h3>
          <div className="space-y-4">
            {[
              { num: 1, text: 'Recibirás un Alias personal para abonar el Derecho a Conexión ($55.000)' },
              { num: 2, text: 'Una vez acreditado el pago, comienza el proceso de instalación' },
              { num: 3, text: 'El área técnica se comunicará para coordinar la instalación' },
              { num: 4, text: 'Al conectarte, abonarás la cuota del mes correspondiente' },
            ].map(step => (
              <div key={step.num} className="flex items-start gap-4">
                <div className="w-8 h-8 bg-emerald-100 text-emerald-600 rounded-lg flex items-center justify-center font-bold text-sm flex-shrink-0">
                  {step.num}
                </div>
                <p className="text-slate-600 pt-1">{step.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <footer className="text-center mt-10 text-sm text-slate-400">
          <p>© 2025 Brandsen Digital · Fibra Óptica al Hogar</p>
        </footer>
      </div>
    </div>
  );
}
