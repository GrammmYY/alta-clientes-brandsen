import React, { useState } from 'react';
import { Wifi, Home, CreditCard, Phone, MapPin, Mail, Tv, Key, FileText, Camera } from 'lucide-react';
interface FormData {
  plan: string;
  direccion: string;
  barrio: string;
  localidad: string;
  cantidadTv: string;
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
export default function FormularioAltaFibra() {
 const [formData, setFormData] = useState<FormData>({
    plan: '',
    direccion: '',
    barrio: '',
    localidad: '',
    cantidadTv: '1',
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

  const planes = [
    { value: '50', label: 'HASTA 50 MEGAS + 1TV - $39.360', precio: 39360 },
    { value: '100', label: 'HASTA 100 MEGAS + 1TV - $44.520', precio: 44520 }
  ];

 const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.plan) newErrors.plan = 'Debe seleccionar un plan';
    if (!formData.direccion) newErrors.direccion = 'La dirección es obligatoria';
    if (!formData.barrio) newErrors.barrio = 'El barrio es obligatorio';
    if (!formData.localidad) newErrors.localidad = 'La localidad es obligatoria';
    if (!formData.email) newErrors.email = 'El email es obligatorio';
    if (!formData.telefono) newErrors.telefono = 'El teléfono es obligatorio';
    if (!formData.ubicacion) newErrors.ubicacion = 'La ubicación es obligatoria';
    
    if (formData.claveWifi && formData.claveWifi.length < 10) {
      newErrors.claveWifi = 'La clave WiFi debe tener mínimo 10 caracteres';
    }
    
    if (formData.metodoPago === 'debito' && !formData.numeroTarjeta) {
      newErrors.numeroTarjeta = 'Complete los datos de la tarjeta';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      alert('Formulario validado correctamente. En producción, aquí se enviarían los datos.');
    }
  };

  const calcularTotalConexion = () => {
    const costoTvUnico = parseInt(formData.tvAdicionales || 0) * 10000;
    return 55000 + costoTvUnico;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-t-2xl p-8 text-white shadow-xl">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              <Wifi className="w-10 h-10" />
              <div>
                <h1 className="text-3xl font-bold">Solicitud de Alta</h1>
                <p className="text-blue-100 text-lg">Fibra Óptica al Hogar</p>
              </div>
            </div>
            {/* Logo de la empresa */}
            <div className="bg-white rounded-lg p-3 shadow-lg">
              <img 
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAcwAAAHMCAYAAABY25iGAADDj0lEQVR4nOzdaWBM19/A8e8sWUcSksjY..." 
                alt="Logo Empresa"
                className="h-12 object-contain"
              />
            </div>
          </div>
        </div>

        {/* Info Box */}
        <div className="bg-blue-50 border-l-4 border-blue-600 p-6 mb-6 shadow-lg">
          <h3 className="font-bold text-blue-900 mb-3 text-lg">Información Importante</h3>
          <ul className="space-y-2 text-sm text-blue-800">
            <li>• <strong>Derecho a Conexión:</strong> $55.000 (se abona al hacer el pedido)</li>
            <li>• <strong>Incluye:</strong> 1 TV conectada + 1 ONU (en comodato)</li>
            <li>• <strong>Instalaciones:</strong> De lunes a viernes (NO sábados)</li>
            <li>• <strong>TV adicional:</strong> $10.000 (único pago) + $1.000 mensual</li>
          </ul>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-b-2xl shadow-2xl p-8 space-y-8">
          
          {/* Sección: Plan */}
          <div className="border-b pb-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Wifi className="w-6 h-6 text-blue-600" />
              Plan a Contratar
            </h2>
            <div className="space-y-3">
              {planes.map(plan => (
                <label key={plan.value} className="flex items-center p-4 border-2 rounded-lg cursor-pointer hover:border-blue-500 transition-colors">
                  <input
                    type="radio"
                    name="plan"
                    value={plan.value}
                    checked={formData.plan === plan.value}
                    onChange={handleChange}
                    className="w-5 h-5 text-blue-600"
                  />
                  <span className="ml-3 text-gray-700 font-medium">{plan.label}</span>
                </label>
              ))}
              {errors.plan && <p className="text-red-500 text-sm mt-1">{errors.plan}</p>}
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                TV adicionales (opcional)
              </label>
              <select
                name="tvAdicionales"
                value={formData.tvAdicionales}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {[0, 1, 2, 3, 4, 5].map(num => (
                  <option key={num} value={num}>
                    {num} {num === 1 ? 'TV adicional' : 'TVs adicionales'}
                    {num > 0 && ` (+$${num * 10000} único + $${num * 1000}/mes)`}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Sección: Domicilio */}
          <div className="border-b pb-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Home className="w-6 h-6 text-blue-600" />
              Datos del Domicilio
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Dirección *</label>
                <input
                  type="text"
                  name="direccion"
                  value={formData.direccion}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Calle y número"
                />
                {errors.direccion && <p className="text-red-500 text-sm mt-1">{errors.direccion}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Barrio *</label>
                <input
                  type="text"
                  name="barrio"
                  value={formData.barrio}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Nombre del barrio"
                />
                {errors.barrio && <p className="text-red-500 text-sm mt-1">{errors.barrio}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Localidad *</label>
                <input
                  type="text"
                  name="localidad"
                  value={formData.localidad}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Ciudad/Localidad"
                />
                {errors.localidad && <p className="text-red-500 text-sm mt-1">{errors.localidad}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <MapPin className="w-4 h-4 inline mr-1" />
                  Ubicación Google Maps *
                </label>
                <input
                  type="text"
                  name="ubicacion"
                  value={formData.ubicacion}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Link de ubicación para el instalador"
                />
                {errors.ubicacion && <p className="text-red-500 text-sm mt-1">{errors.ubicacion}</p>}
              </div>
            </div>
          </div>

          {/* Sección: Contacto */}
          <div className="border-b pb-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Phone className="w-6 h-6 text-blue-600" />
              Datos de Contacto
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Teléfono *</label>
                <input
                  type="tel"
                  name="telefono"
                  value={formData.telefono}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Número de contacto"
                />
                {errors.telefono && <p className="text-red-500 text-sm mt-1">{errors.telefono}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Mail className="w-4 h-4 inline mr-1" />
                  Correo Electrónico *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="email@ejemplo.com"
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>
            </div>
          </div>

          {/* Sección: WiFi */}
          <div className="border-b pb-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Key className="w-6 h-6 text-blue-600" />
              Configuración WiFi
            </h2>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Clave WiFi (mínimo 10 caracteres: letras y números)
              </label>
              <input
                type="text"
                name="claveWifi"
                value={formData.claveWifi}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Ej: MiClave2025ABC"
                minLength={10}
              />
              <p className="text-xs text-gray-500 mt-1">
                Esta clave quedará asignada al equipo. El cambio posterior tiene costo.
              </p>
              {errors.claveWifi && <p className="text-red-500 text-sm mt-1">{errors.claveWifi}</p>}
            </div>
          </div>

          {/* Sección: Pago */}
          <div className="border-b pb-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <CreditCard className="w-6 h-6 text-blue-600" />
              Forma de Pago
            </h2>
            
            <div className="mb-4">
              <label className="flex items-center p-4 border-2 rounded-lg cursor-pointer mb-2">
                <input
                  type="radio"
                  name="metodoPago"
                  value="manual"
                  checked={formData.metodoPago === 'manual'}
                  onChange={handleChange}
                  className="w-5 h-5 text-blue-600"
                />
                <span className="ml-3 text-gray-700 font-medium">
                  Pago manual (recibirás Alias para transferir)
                </span>
              </label>
              
              <label className="flex items-center p-4 border-2 rounded-lg cursor-pointer">
                <input
                  type="radio"
                  name="metodoPago"
                  value="debito"
                  checked={formData.metodoPago === 'debito'}
                  onChange={handleChange}
                  className="w-5 h-5 text-blue-600"
                />
                <span className="ml-3 text-gray-700 font-medium">
                  Débito automático (tarjeta de crédito/débito)
                </span>
              </label>
            </div>

            {formData.metodoPago === 'debito' && (
              <div className="bg-gray-50 p-6 rounded-lg space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Número de Tarjeta (16 dígitos) *
                    </label>
                    <input
                      type="text"
                      name="numeroTarjeta"
                      value={formData.numeroTarjeta}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="1234 5678 9012 3456"
                      maxLength={19}
                    />
                    {errors.numeroTarjeta && <p className="text-red-500 text-sm mt-1">{errors.numeroTarjeta}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Vencimiento *</label>
                    <input
                      type="text"
                      name="vencimiento"
                      value={formData.vencimiento}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="MM/AA"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Tipo *</label>
                    <select
                      name="tipoTarjeta"
                      value={formData.tipoTarjeta}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Seleccionar...</option>
                      <option value="debito">Débito</option>
                      <option value="credito">Crédito</option>
                    </select>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Banco *</label>
                    <input
                      type="text"
                      name="banco"
                      value={formData.banco}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Nombre del banco"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Documentación Requerida */}
          <div className="border-b pb-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <FileText className="w-6 h-6 text-blue-600" />
              Documentación Requerida
            </h2>
            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4">
              <p className="text-sm text-yellow-800 mb-3 font-medium">
                Recordá enviar la siguiente documentación junto con este formulario:
              </p>
              <ul className="space-y-2 text-sm text-yellow-900">
                <li className="flex items-start gap-2">
                  <Camera className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span><strong>DNI:</strong> Frente y reverso (foto clara)</span>
                </li>
                <li className="flex items-start gap-2">
                  <Camera className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span><strong>Foto de la vivienda:</strong> Fachada o frente de la casa</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Resumen */}
          {formData.plan && (
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-xl">
              <h3 className="text-xl font-bold mb-4">Resumen de tu Solicitud</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Plan seleccionado:</span>
                  <span className="font-bold">{formData.plan} MEGAS + 1TV</span>
                </div>
                <div className="flex justify-between">
                  <span>Derecho a conexión:</span>
                  <span className="font-bold">$55.000</span>
                </div>
                {parseInt(formData.tvAdicionales) > 0 && (
                  <div className="flex justify-between">
                    <span>TV adicionales ({formData.tvAdicionales}):</span>
                    <span className="font-bold">${(parseInt(formData.tvAdicionales) * 10000).toLocaleString()}</span>
                  </div>
                )}
                <div className="border-t border-white/30 pt-2 mt-2">
                  <div className="flex justify-between text-lg">
                    <span className="font-bold">Total a Abonar:</span>
                    <span className="font-bold">${calcularTotalConexion().toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-xl font-bold text-lg hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            Enviar Solicitud de Alta
          </button>

          <p className="text-xs text-gray-500 text-center mt-4">
            Al enviar este formulario, acepto los términos y condiciones del servicio.
            El pago del derecho a conexión se realizará mediante el Alias que recibiré.
          </p>
        </form>

        {/* Footer Info */}
        <div className="mt-6 bg-white rounded-xl shadow-lg p-6">
          <h3 className="font-bold text-gray-800 mb-3">Próximos Pasos:</h3>
          <ol className="space-y-2 text-sm text-gray-700">
            <li>1. Recibirás un <strong>Alias personal</strong> para abonar el Derecho a Conexión ($55.000)</li>
            <li>2. Una vez acreditado el pago, <strong>comienza el proceso de instalación</strong></li>
            <li>3. El área técnica se comunicará para <strong>coordinar la instalación</strong></li>
            <li>4. Al conectarte, abonarás la cuota del mes o proporción correspondiente</li>
          </ol>
        </div>
      </div>
    </div>
  );
}
