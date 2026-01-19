import { useState } from 'react';
import { Wifi, Home, CreditCard, Phone, MapPin, Mail, Key, Camera, Upload, X } from 'lucide-react';

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
    { value: '50', label: 'HASTA 50 MEGAS + 1TV', precio: 39360 },
    { value: '100', label: 'HASTA 100 MEGAS + 1TV', precio: 44520 }
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
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      alert('¡Formulario validado! En producción se enviarían los datos.');
    }
  };

  const calcularTotalConexion = () => {
    return 55000 + parseInt(formData.tvAdicionales || '0') * 10000;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-12">
        
        <div className="bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-600 rounded-3xl p-6 sm:p-10 text-white shadow-2xl mb-8">
          <div className="flex items-center gap-4">
            <div className="bg-white/20 backdrop-blur-sm p-4 rounded-2xl">
              <Wifi className="w-10 h-10 sm:w-12 sm:h-12" />
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold">Brandsen Digital</h1>
              <p className="text-blue-100 text-lg sm:text-xl">Solicitud de Alta - Fibra Óptica</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-blue-600 rounded-2xl p-5 sm:p-6 mb-8 shadow-lg">
          <h3 className="font-bold text-blue-900 mb-4 text-lg sm:text-xl">📋 Información Importante</h3>
          <div className="grid sm:grid-cols-2 gap-3 text-sm sm:text-base text-blue-800">
            <div className="flex items-start gap-2"><span className="font-bold">✓</span><span><strong>Conexión:</strong> $55.000</span></div>
            <div className="flex items-start gap-2"><span className="font-bold">✓</span><span><strong>Incluye:</strong> 1 TV + ONU</span></div>
            <div className="flex items-start gap-2"><span className="font-bold">✓</span><span><strong>Instalación:</strong> Lun-Vie</span></div>
            <div className="flex items-start gap-2"><span className="font-bold">✓</span><span><strong>TV extra:</strong> $10K + $1K/mes</span></div>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          
          <div className="p-6 sm:p-8 border-b-2 border-gray-100">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
              <div className="bg-blue-100 p-2 rounded-xl"><Wifi className="w-6 h-6 text-blue-600" /></div>
              Elegí tu Plan
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {planes.map(plan => (
                <label key={plan.value} className={`p-6 border-3 rounded-2xl cursor-pointer transition-all ${formData.plan === plan.value ? 'border-blue-600 bg-blue-50 shadow-lg' : 'border-gray-200 hover:border-blue-300'}`}>
                  <input type="radio" name="plan" value={plan.value} checked={formData.plan === plan.value} onChange={handleChange} className="sr-only" />
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-4xl font-bold text-blue-600">{plan.value}MB</span>
                    {formData.plan === plan.value && <div className="bg-blue-600 text-white rounded-full p-1"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg></div>}
                  </div>
                  <p className="text-gray-600 mb-3">{plan.label}</p>
                  <div className="text-3xl font-bold text-gray-900">${plan.precio.toLocaleString()}<span className="text-lg text-gray-500 font-normal">/mes</span></div>
                </label>
              ))}
            </div>
            {errors.plan && <p className="text-red-500 text-sm mt-3">{errors.plan}</p>}
            <div className="mt-6 bg-gray-50 p-5 rounded-2xl">
              <label className="block font-semibold text-gray-700 mb-3">¿TVs adicionales?</label>
              <select name="tvAdicionales" value={formData.tvAdicionales} onChange={handleChange} className="w-full p-4 text-lg border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500">
                {[0,1,2,3,4,5].map(n => <option key={n} value={n}>{n === 0 ? 'Sin TVs adicionales' : `${n} TV${n>1?'s':''} - $${n*10000} + $${n*1000}/mes`}</option>)}
              </select>
            </div>
          </div>

          <div className="p-6 sm:p-8 border-b-2 border-gray-100 bg-gray-50">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
              <div className="bg-green-100 p-2 rounded-xl"><Home className="w-6 h-6 text-green-600" /></div>
              Domicilio
            </h2>
            <div className="grid sm:grid-cols-2 gap-5">
              <div className="sm:col-span-2"><label className="block font-semibold text-gray-700 mb-2">Dirección *</label><input type="text" name="direccion" value={formData.direccion} onChange={handleChange} className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500" placeholder="Av. San Martín 1234" />{errors.direccion && <p className="text-red-500 text-sm mt-2">{errors.direccion}</p>}</div>
              <div><label className="block font-semibold text-gray-700 mb-2">Barrio *</label><input type="text" name="barrio" value={formData.barrio} onChange={handleChange} className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500" placeholder="Centro" />{errors.barrio && <p className="text-red-500 text-sm mt-2">{errors.barrio}</p>}</div>
              <div><label className="block font-semibold text-gray-700 mb-2">Localidad *</label><input type="text" name="localidad" value={formData.localidad} onChange={handleChange} className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500" placeholder="Brandsen" />{errors.localidad && <p className="text-red-500 text-sm mt-2">{errors.localidad}</p>}</div>
              <div className="sm:col-span-2"><label className="block font-semibold text-gray-700 mb-2 flex items-center gap-2"><MapPin className="w-4 h-4 text-blue-600" />Ubicación (Google Maps) *</label><input type="text" name="ubicacion" value={formData.ubicacion} onChange={handleChange} className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500" placeholder="Link de Google Maps" />{errors.ubicacion && <p className="text-red-500 text-sm mt-2">{errors.ubicacion}</p>}</div>
            </div>
          </div>

          <div className="p-6 sm:p-8 border-b-2 border-gray-100">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
              <div className="bg-purple-100 p-2 rounded-xl"><Phone className="w-6 h-6 text-purple-600" /></div>
              Contacto
            </h2>
            <div className="grid sm:grid-cols-2 gap-5">
              <div><label className="block font-semibold text-gray-700 mb-2">Teléfono *</label><input type="tel" name="telefono" value={formData.telefono} onChange={handleChange} className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500" placeholder="11 1234-5678" />{errors.telefono && <p className="text-red-500 text-sm mt-2">{errors.telefono}</p>}</div>
              <div><label className="block font-semibold text-gray-700 mb-2 flex items-center gap-2"><Mail className="w-4 h-4" />Email *</label><input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500" placeholder="tu@email.com" />{errors.email && <p className="text-red-500 text-sm mt-2">{errors.email}</p>}</div>
            </div>
          </div>

          <div className="p-6 sm:p-8 border-b-2 border-gray-100 bg-amber-50">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
              <div className="bg-amber-100 p-2 rounded-xl"><Camera className="w-6 h-6 text-amber-600" /></div>
              Fotos Requeridas
            </h2>
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <label className="block font-semibold text-gray-700 mb-3">DNI - Frente *</label>
                {!dniFrente ? (
                  <label className="flex flex-col items-center justify-center w-full h-56 border-3 border-dashed border-gray-300 rounded-2xl cursor-pointer bg-white hover:bg-gray-50 hover:border-blue-400">
                    <Upload className="w-12 h-12 text-gray-400 mb-3" /><span className="text-gray-600 font-medium">Subir foto</span><span className="text-sm text-gray-400 mt-1">JPG/PNG (máx 5MB)</span>
                    <input type="file" accept="image/*" onChange={(e) => handleFileChange(e, setDniFrente)} className="hidden" />
                  </label>
                ) : (
                  <div className="relative"><img src={dniFrente.preview} alt="DNI Frente" className="w-full h-56 object-cover rounded-2xl" /><button onClick={() => removeFile(setDniFrente, dniFrente.preview)} className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600"><X className="w-5 h-5" /></button></div>
                )}
              </div>
              <div>
                <label className="block font-semibold text-gray-700 mb-3">DNI - Reverso *</label>
                {!dniReverso ? (
                  <label className="flex flex-col items-center justify-center w-full h-56 border-3 border-dashed border-gray-300 rounded-2xl cursor-pointer bg-white hover:bg-gray-50 hover:border-blue-400">
                    <Upload className="w-12 h-12 text-gray-400 mb-3" /><span className="text-gray-600 font-medium">Subir foto</span><span className="text-sm text-gray-400 mt-1">JPG/PNG (máx 5MB)</span>
                    <input type="file" accept="image/*" onChange={(e) => handleFileChange(e, setDniReverso)} className="hidden" />
                  </label>
                ) : (
                  <div className="relative"><img src={dniReverso.preview} alt="DNI Reverso" className="w-full h-56 object-cover rounded-2xl" /><button onClick={() => removeFile(setDniReverso, dniReverso.preview)} className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600"><X className="w-5 h-5" /></button></div>
                )}
              </div>
              <div className="sm:col-span-2">
                <label className="block font-semibold text-gray-700 mb-3">Foto de la Vivienda *</label>
                {!fotoVivienda ? (
                  <label className="flex flex-col items-center justify-center w-full h-56 border-3 border-dashed border-gray-300 rounded-2xl cursor-pointer bg-white hover:bg-gray-50 hover:border-blue-400">
                    <Upload className="w-12 h-12 text-gray-400 mb-3" /><span className="text-gray-600 font-medium">Subir foto fachada</span><span className="text-sm text-gray-400 mt-1">JPG/PNG (máx 5MB)</span>
                    <input type="file" accept="image/*" onChange={(e) => handleFileChange(e, setFotoVivienda)} className="hidden" />
                  </label>
                ) : (
                  <div className="relative"><img src={fotoVivienda.preview} alt="Vivienda" className="w-full h-64 object-cover rounded-2xl" /><button onClick={() => removeFile(setFotoVivienda, fotoVivienda.preview)} className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600"><X className="w-5 h-5" /></button></div>
                )}
              </div>
            </div>
          </div>

          <div className="p-6 sm:p-8 border-b-2 border-gray-100">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
              <div className="bg-cyan-100 p-2 rounded-xl"><Key className="w-6 h-6 text-cyan-600" /></div>
              WiFi
            </h2>
            <div className="bg-cyan-50 p-6 rounded-2xl">
              <label className="block font-semibold text-gray-700 mb-3">Clave WiFi (mín 10 caracteres)</label>
              <input type="text" name="claveWifi" value={formData.claveWifi} onChange={handleChange} className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500" placeholder="MiClave2025ABC" minLength={10} />
              <p className="text-sm text-gray-600 mt-2">⚠️ El cambio posterior tiene costo</p>
              {errors.claveWifi && <p className="text-red-500 text-sm mt-2">{errors.claveWifi}</p>}
            </div>
          </div>

          <div className="p-6 sm:p-8 border-b-2 border-gray-100 bg-emerald-50">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
              <div className="bg-emerald-100 p-2 rounded-xl"><CreditCard className="w-6 h-6 text-emerald-600" /></div>
              Forma de Pago
            </h2>
            <div className="space-y-4">
              <label className={`flex items-center p-5 border-3 rounded-2xl cursor-pointer ${formData.metodoPago === 'manual' ? 'border-emerald-600 bg-emerald-100' : 'border-gray-200 hover:border-emerald-300'}`}>
                <input type="radio" name="metodoPago" value="manual" checked={formData.metodoPago === 'manual'} onChange={handleChange} className="w-5 h-5" />
                <span className="ml-4 text-lg font-semibold">Pago manual (Alias)</span>
              </label>
              <label className={`flex items-center p-5 border-3 rounded-2xl cursor-pointer ${formData.metodoPago === 'debito' ? 'border-emerald-600 bg-emerald-100' : 'border-gray-200 hover:border-emerald-300'}`}>
                <input type="radio" name="metodoPago" value="debito" checked={formData.metodoPago === 'debito'} onChange={handleChange} className="w-5 h-5" />
                <span className="ml-4 text-lg font-semibold">Débito automático</span>
              </label>
            </div>
            {formData.metodoPago === 'debito' && (
              <div className="mt-6 bg-white p-6 rounded-2xl border-2">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2"><label className="block font-semibold text-gray-700 mb-2">Número de Tarjeta *</label><input type="text" name="numeroTarjeta" value={formData.numeroTarjeta} onChange={handleChange} className="w-full p-4 border-2 border-gray-200 rounded-xl" placeholder="1234 5678 9012 3456" maxLength={19} />{errors.numeroTarjeta && <p className="text-red-500 text-sm mt-2">{errors.numeroTarjeta}</p>}</div>
                  <div><label className="block font-semibold text-gray-700 mb-2">Vencimiento</label><input type="text" name="vencimiento" value={formData.vencimiento} onChange={handleChange} className="w-full p-4 border-2 border-gray-200 rounded-xl" placeholder="MM/AA" /></div>
                  <div><label className="block font-semibold text-gray-700 mb-2">Tipo</label><select name="tipoTarjeta" value={formData.tipoTarjeta} onChange={handleChange} className="w-full p-4 border-2 border-gray-200 rounded-xl"><option value="">Seleccionar</option><option value="debito">Débito</option><option value="credito">Crédito</option></select></div>
                  <div className="sm:col-span-2"><label className="block font-semibold text-gray-700 mb-2">Banco</label><input type="text" name="banco" value={formData.banco} onChange={handleChange} className="w-full p-4 border-2 border-gray-200 rounded-xl" placeholder="Nombre del banco" /></div>
                </div>
              </div>
            )}
          </div>

          {formData.plan && (
            <div className="p-6 sm:p-8 border-b-2 border-gray-100">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-2xl">
                <h3 className="text-2xl font-bold mb-4">💰 Resumen</h3>
                <div className="space-y-3">
                  <div className="flex justify-between text-lg"><span>Plan:</span><span className="font-bold">{formData.plan} MEGAS</span></div>
                  <div className="flex justify-between"><span>Conexión:</span><span className="font-bold">$55.000</span></div>
                  {parseInt(formData.tvAdicionales||'0')>0&&<div className="flex justify-between"><span>TVs adicionales ({formData.tvAdicionales}):</span><span className="font-bold">${(parseInt(formData.tvAdicionales||'0')*10000).toLocaleString()}</span></div>}
                  <div className="border-t border-white/30 pt-3 flex justify-between text-2xl"><span className="font-bold">TOTAL:</span><span className="font-bold">${calcularTotalConexion().toLocaleString()}</span></div>
                </div>
              </div>
            </div>
          )}

          <div className="p-6 sm:p-8">
            <button onClick={handleSubmit} className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-5 rounded-2xl font-bold text-xl hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1">
              🚀 Enviar Solicitud
            </button>
            <p className="text-sm text-gray-500 text-center mt-4">Al enviar, aceptás los términos del servicio</p>
          </div>
        </div>

        <div className="mt-8 bg-white rounded-2xl shadow-lg p-6">
          <h3 className="font-bold text-gray-800 mb-3 text-lg">📌 Próximos Pasos</h3>
          <ol className="space-y-2 text-gray-700">
            <li>1️⃣ Recibirás un <strong>Alias</strong> para abonar ($55.000)</li>
            <li>2️⃣ Acreditado el pago, <strong>comienza instalación</strong></li>
            <li>3️⃣ Te contactamos para <strong>coordinar fecha</strong></li>
            <li>4️⃣ Al conectarte, abonás la <strong>cuota mensual</strong></li>
          </ol>
        </div>
      </div>
    </div>
  );
}
