/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Printer, X, Calendar } from 'lucide-react';
import { useState, forwardRef } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { ptBR } from 'date-fns/locale/pt-BR';
import { registerLocale } from 'react-datepicker';

registerLocale('pt-BR', ptBR);

const CustomDateInput = forwardRef(({ value, onClick, dia, mes, ano }: any, ref: any) => (
  <div 
    className="flex items-center justify-center gap-0.5 w-full h-full cursor-pointer"
    onClick={onClick}
    ref={ref}
  >
    <input className="w-3 text-center text-[8px] outline-none font-bold bg-transparent pointer-events-none" readOnly value={dia} />
    <span className="text-[8px]">/</span>
    <input className="w-3 text-center text-[8px] outline-none font-bold bg-transparent pointer-events-none" readOnly value={mes} />
    <span className="text-[8px]">/</span>
    <input className="w-5 text-center text-[8px] outline-none font-bold bg-transparent pointer-events-none" readOnly value={ano} />
  </div>
));

interface FormData {
  unidade: string;
  codigo: string;
  cnpj: string;
  ie: string;
  razaoSocial: string;
  nomeFantasia: string;
  endereco: string;
  numero: string;
  complemento: string;
  cep: string;
  bairro: string;
  cidade: string;
  uf: string;
  pontoReferencia: string;
  ddd1: string;
  telefone1: string;
  ddd2: string;
  telefone2: string;
  email: string;
  contato1: string;
  contato2: string;
  rota: string;
  visita: string;
  gtc: string;
  keyAccount: string;
  latitude: string;
  longitude: string;
  pdvEquipmentQtd: string;
  pdvEquipmentNTag: string;
  pdvVasilhameQtd: string;
  ocorrencia: string;
  dataDia: string;
  dataMes: string;
  dataAno: string;
  agendamentoDia: string;
  agendamentoMes: string;
  agendamentoAno: string;
  encerrouNegociacoes: string;
  ativosSim: string;
  ativosNao: string;
  footerCidade: string;
  footerDia: string;
  footerMes: string;
  footerAno: string;
  observacoes: string;
  pesquisador: string;
  clienteRep: string;
  cpfRep: string;
  solicitante: string;
  dataOcorrencia: string;
  dataAgendamento: string;
}

const InputField = ({ 
  label, 
  id, 
  value, 
  onChange, 
  className = "", 
  type = "text" 
}: { 
  label: string, 
  id: string, 
  value: string, 
  onChange: (val: string) => void, 
  className?: string, 
  type?: string 
}) => (
  <div className={`border-r border-b border-black p-1 flex flex-col ${className}`}>
    <label htmlFor={id} className="text-[10px] uppercase font-bold leading-tight">{label}:</label>
    <input
      type={type}
      id={id}
      className="w-full bg-transparent outline-none text-sm placeholder:opacity-30 border-none focus:ring-0 p-0"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  </div>
);

const Checkbox = ({ id, label, checked, onToggle }: { id: string, label: string, checked: boolean, onToggle: () => void }) => (
  <button 
    type="button"
    className="flex items-center gap-1 text-[9px] font-bold cursor-pointer select-none whitespace-nowrap"
    onClick={(e) => {
      e.preventDefault();
      onToggle();
    }}
  >
    <div className="w-3.5 h-3.5 border border-black flex items-center justify-center bg-white">
      {checked && <X size={12} strokeWidth={4} className="text-black" />}
    </div>
    <span>{label}</span>
  </button>
);

export default function App() {
  const [formData, setFormData] = useState<FormData>({
    unidade: '',
    codigo: '',
    cnpj: '',
    ie: '',
    razaoSocial: '',
    nomeFantasia: '',
    endereco: '',
    numero: '',
    complemento: '',
    cep: '',
    bairro: '',
    cidade: '',
    uf: '',
    pontoReferencia: '',
    ddd1: '',
    telefone1: '',
    ddd2: '',
    telefone2: '',
    email: '',
    contato1: '',
    contato2: '',
    rota: '',
    visita: '',
    gtc: '',
    keyAccount: '',
    latitude: '',
    longitude: '',
    pdvEquipmentQtd: '',
    pdvEquipmentNTag: '',
    pdvVasilhameQtd: '',
    ocorrencia: '',
    dataDia: '',
    dataMes: '',
    dataAno: '',
    agendamentoDia: '',
    agendamentoMes: '',
    agendamentoAno: '',
    encerrouNegociacoes: '',
    ativosSim: '',
    ativosNao: '',
    footerCidade: '',
    footerDia: '',
    footerMes: '',
    footerAno: '',
    observacoes: '',
    pesquisador: '',
    clienteRep: '',
    cpfRep: '',
    solicitante: '',
    dataOcorrencia: '',
    dataAgendamento: '',
  });

  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

  const handlePrint = () => {
    window.print();
  };

  const handleCheckboxToggle = (id: string) => {
    setCheckedItems(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const updateField = (id: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleDateChange = (type: 'data' | 'agendamento', date: Date | null) => {
    if (!date) return;
    
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = String(date.getFullYear());

    if (type === 'data') {
      setFormData(prev => ({
        ...prev,
        dataDia: day,
        dataMes: month,
        dataAno: year
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        agendamentoDia: day,
        agendamentoMes: month,
        agendamentoAno: year
      }));
    }
  };

  const parseDate = (dia: string, mes: string, ano: string) => {
    if (!dia || !mes || !ano) return null;
    const date = new Date(Number(ano), Number(mes) - 1, Number(dia));
    return isNaN(date.getTime()) ? null : date;
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 print:p-0 print:bg-white">
      {/* Action Bar */}
      <div className="max-w-[1000px] mx-auto mb-4 flex justify-end print:hidden">
        <button
          onClick={handlePrint}
          className="bg-red-600 text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-red-700 transition-colors shadow-lg"
          id="print-button"
        >
          <Printer size={20} />
          Imprimir PDF
        </button>
      </div>

      {/* Main Form Page */}
      <div className="max-w-[1000px] mx-auto bg-white border-2 border-black print:border-none shadow-xl print:shadow-none overflow-hidden print:overflow-visible print:m-0 print:p-0" id="form-content">
        
        {/* Header Section */}
        <div className="text-center border-b-2 border-black py-1 bg-slate-200">
          <h1 className="text-xl font-bold uppercase tracking-widest">Formulário Cadastro de Clientes</h1>
        </div>

        {/* Top Row: Logo, Unidade, Solicitação, Datas */}
        <div className="grid grid-cols-24 border-b border-black h-[60px]">
          {/* Logo Area (6 units) */}
          <div className="col-span-6 border-r border-black p-1 py-1 flex flex-col items-center justify-center bg-white h-full">
             <div className="flex items-start">
               <div className="flex items-center text-[28px] font-bold tracking-[-0.05em] leading-none text-black">
                 <span>S</span>
                 <div className="relative flex items-center justify-center w-[0.7em] h-[0.7em] mx-[0.05em]">
                    <div className="absolute inset-0 border-[2px] border-black rounded-full"></div>
                    <div className="w-[2.5px] h-[2.5px] bg-red-600 rounded-full"></div>
                 </div>
                 <span>LAR</span>
               </div>
               <div className="flex flex-col ml-1 pt-1">
                 <div className="flex items-center gap-0.5">
                    <span className="text-[8.5px] font-bold leading-none">BR</span>
                 </div>
                 <div className="text-[4px] font-bold leading-none text-gray-700 whitespace-nowrap mt-0.5">REFRESCOS S.A.</div>
               </div>
             </div>
             
             <div className="w-16 mt-0.5">
               <img 
                 src="https://upload.wikimedia.org/wikipedia/commons/c/ce/Coca-Cola_logo.svg" 
                 alt="Coca-Cola" 
                 className="w-full h-auto"
                 referrerPolicy="no-referrer"
               />
             </div>
           </div>

          {/* Unidade/Código Section (3 units) */}
          <div className="col-span-3 border-r border-black flex flex-col bg-white h-full">
            <div className="h-[14px] border-b border-black flex items-center justify-center text-[12px] font-bold uppercase">UNIDADE</div>
            <div className="h-[16px] border-b border-black flex items-center justify-center px-0.5">
              <input 
                className="w-full text-center text-[17px] outline-none font-bold leading-none" 
                value={formData.unidade}
                onChange={(e) => updateField('unidade', e.target.value)}
              />
            </div>
            <div className="h-[14px] border-b border-black flex items-center justify-center text-[12px] font-bold uppercase">CÓDIGO</div>
            <div className="h-[16px] flex items-center justify-center px-0.5">
              <input 
                className="w-full text-center text-[17px] outline-none font-bold leading-none" 
                value={formData.codigo}
                onChange={(e) => updateField('codigo', e.target.value)}
              />
            </div>
          </div>

          {/* Tipo de Solicitação (11 units) */}
          <div className="col-span-11 flex flex-col bg-white h-full">
            <div className="h-[14px] border-b border-black flex items-center justify-center text-[12px] font-bold uppercase">
              TIPO DE SOLICITAÇÃO:
            </div>
            <div className="flex-1 flex flex-col px-3 py-0.5 justify-center border-r border-black">
              <div className="grid grid-cols-3 gap-y-0.5">
                <Checkbox id="inc" label="INCLUSÃO" checked={!!checkedItems['inc']} onToggle={() => handleCheckboxToggle('inc')} />
                <Checkbox id="alt" label="ALTERAÇÃO" checked={!!checkedItems['alt']} onToggle={() => handleCheckboxToggle('alt')} />
                <Checkbox id="tr" label="TROCA DE RAZÃO" checked={!!checkedItems['tr']} onToggle={() => handleCheckboxToggle('tr')} />
                <Checkbox id="reat" label="REATIVAÇÃO" checked={!!checkedItems['reat']} onToggle={() => handleCheckboxToggle('reat')} />
                <Checkbox id="excl" label="EXCLUSÃO" checked={!!checkedItems['excl']} onToggle={() => handleCheckboxToggle('excl')} />
                <div className="flex flex-col flex-1 items-center justify-end">
                  <div className="w-full border-b border-black mb-0.5" />
                  <span className="text-[9px] italic leading-none whitespace-nowrap">Informar o código a ser suprimido.</span>
                </div>
              </div>
            </div>
          </div>

          {/* Ocorrência, Data, Agendamento (4 units) */}
          <div className="col-span-4 flex flex-col bg-white h-full">
            <div className="h-[14px] border-b border-black"></div> {/* Space above Occurrence matched to Solicitação header */}
            <div className="flex-1 border-b border-black grid grid-cols-3 items-stretch">
              <div className="col-span-1 border-r border-black flex items-center justify-center text-[7.5px] font-bold uppercase h-full">OCORRÊNCIA</div>
              <div className="col-span-2 flex items-center justify-center px-0.5">
                <input 
                  className="w-full text-center text-[8.5px] outline-none font-bold" 
                  value={formData.ocorrencia}
                  onChange={(e) => updateField('ocorrencia', e.target.value)}
                />
              </div>
            </div>
            <div className="flex-1 border-b border-black grid grid-cols-3 items-stretch">
              <div className="col-span-1 border-r border-black flex items-center justify-center text-[7.5px] font-bold uppercase h-full">DATA</div>
              <div className="col-span-2 flex items-center justify-center gap-0.5 px-0.5 relative group">
                <input className="w-3 text-center text-[8px] outline-none font-bold bg-transparent" maxLength={2} value={formData.dataDia} onChange={(e) => updateField('dataDia', e.target.value)} />
                <span className="text-[8px]">/</span>
                <input className="w-3 text-center text-[8px] outline-none font-bold bg-transparent" maxLength={2} value={formData.dataMes} onChange={(e) => updateField('dataMes', e.target.value)} />
                <span className="text-[8px]">/</span>
                <input className="w-5 text-center text-[8px] outline-none font-bold bg-transparent" maxLength={4} value={formData.dataAno} onChange={(e) => updateField('dataAno', e.target.value)} />
                
                <div className="absolute right-0 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity flex items-center pr-0.5">
                  <DatePicker
                    selected={parseDate(formData.dataDia, formData.dataMes, formData.dataAno)}
                    onChange={(date) => handleDateChange('data', date)}
                    dateFormat="dd/MM/yyyy"
                    locale="pt-BR"
                    customInput={<Calendar size={10} className="cursor-pointer text-gray-500 hover:text-black" />}
                    popperPlacement="bottom-end"
                    portalId="root-portal"
                  />
                </div>
              </div>
            </div>
            <div className="flex-1 grid grid-cols-3 items-stretch">
              <div className="col-span-1 border-r border-black flex items-center justify-center text-[7.5px] font-bold uppercase px-0.5 leading-tight text-center h-full">AGENDAM.</div>
              <div className="col-span-2 flex items-center justify-center gap-0.5 px-0.5 relative group">
                <input className="w-3 text-center text-[8px] outline-none font-bold bg-transparent" maxLength={2} value={formData.agendamentoDia} onChange={(e) => updateField('agendamentoDia', e.target.value)} />
                <span className="text-[8px]">/</span>
                <input className="w-3 text-center text-[8px] outline-none font-bold bg-transparent" maxLength={2} value={formData.agendamentoMes} onChange={(e) => updateField('agendamentoMes', e.target.value)} />
                <span className="text-[8px]">/</span>
                <input className="w-5 text-center text-[8px] outline-none font-bold bg-transparent" maxLength={4} value={formData.agendamentoAno} onChange={(e) => updateField('agendamentoAno', e.target.value)} />

                <div className="absolute right-0 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity flex items-center pr-0.5">
                  <DatePicker
                    selected={parseDate(formData.agendamentoDia, formData.agendamentoMes, formData.agendamentoAno)}
                    onChange={(date) => handleDateChange('agendamento', date)}
                    dateFormat="dd/MM/yyyy"
                    locale="pt-BR"
                    customInput={<Calendar size={10} className="cursor-pointer text-gray-500 hover:text-black" />}
                    popperPlacement="bottom-end"
                    portalId="root-portal"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>



        {/* Warning Banner */}
        <div className="bg-slate-200 text-black text-center py-1 text-[11px] font-bold tracking-tight border-y border-black">
          Importante: todos os campos são obrigatórios. Preencher com LETRA LEGÍVEL e de FÔRMA, SEM RASURAS.
        </div>

        {/* Researcher Script */}
        <div className="p-1 px-2 border-b border-black leading-tight italic">
          <p className="text-[9px]"><strong>Script pesquisador:</strong> Bom dia (boa tarde), eu poderia falar com o(a) senhor(a)..., por favor?</p>
          <p className="text-[9px]">Senhor(a)..., meu nome é..., sou da empresa Solar Refrescos. Estou visitando seu ponto de vendas para atender sua solicitação de cadastro.</p>
        </div>

        {/* Client Fields */}
        <div className="grid grid-cols-12 border-b border-black">
          <InputField label="CNPJ" id="cnpj" className="col-span-6" value={formData.cnpj} onChange={(v) => updateField('cnpj', v)} />
          <InputField label="Inscrição Estadual" id="ie" className="col-span-6 border-r-0" value={formData.ie} onChange={(v) => updateField('ie', v)}  />
        </div>
        <div className="border-b border-black">
          <InputField label="Razão social" id="razaoSocial" className="border-r-0" value={formData.razaoSocial} onChange={(v) => updateField('razaoSocial', v)} />
        </div>
        <div className="border-b border-black">
          <InputField label="Nome fantasia" id="nomeFantasia" className="border-r-0" value={formData.nomeFantasia} onChange={(v) => updateField('nomeFantasia', v)} />
        </div>
        
        {/* Address Row 1 */}
        <div className="grid grid-cols-12 border-b border-black">
          <InputField label="Endereço" id="endereco" className="col-span-9" value={formData.endereco} onChange={(v) => updateField('endereco', v)} />
          <InputField label="Número" id="numero" className="col-span-3 border-r-0" value={formData.numero} onChange={(v) => updateField('numero', v)} />
        </div>
        
        {/* Address Row 2 */}
        <div className="grid grid-cols-12 border-b border-black">
          <InputField label="Complemento" id="complemento" className="col-span-9" value={formData.complemento} onChange={(v) => updateField('complemento', v)} />
          <InputField label="Cep" id="cep" className="col-span-3 border-r-0" value={formData.cep} onChange={(v) => updateField('cep', v)} />
        </div>
 
        {/* Address Row 3 */}
        <div className="grid grid-cols-12 border-b border-black">
          <InputField label="Bairro" id="bairro" className="col-span-6" value={formData.bairro} onChange={(v) => updateField('bairro', v)} />
          <InputField label="Cidade" id="cidade" className="col-span-4" value={formData.cidade} onChange={(v) => updateField('cidade', v)} />
          <InputField label="UF" id="uf" className="col-span-2 border-r-0" value={formData.uf} onChange={(v) => updateField('uf', v)} />
        </div>
 
        {/* Address Row 4 */}
        <div className="border-b border-black">
          <InputField label="Ponto de referência" id="pontoReferencia" className="border-r-0" value={formData.pontoReferencia} onChange={(v) => updateField('pontoReferencia', v)} />
        </div>
 
        {/* Contacts */}
        <div className="grid grid-cols-12 border-b border-black">
          <div className="col-span-6 border-r border-black grid grid-cols-12">
            <InputField label="DDD" id="ddd1" className="col-span-2" value={formData.ddd1} onChange={(v) => updateField('ddd1', v)} />
            <InputField label="Telefone 1" id="telefone1" className="col-span-10 border-r-0" value={formData.telefone1} onChange={(v) => updateField('telefone1', v)} />
          </div>
          <div className="col-span-6 grid grid-cols-12">
            <InputField label="DDD" id="ddd2" className="col-span-2" value={formData.ddd2} onChange={(v) => updateField('ddd2', v)} />
            <InputField label="Telefone 2" id="telefone2" className="col-span-10 border-r-0" value={formData.telefone2} onChange={(v) => updateField('telefone2', v)} />
          </div>
        </div>
 
        <div className="grid grid-cols-24 border-b border-black">
          <InputField label="E-mail" id="email" className="col-span-12 border-b-0" value={formData.email} onChange={(v) => updateField('email', v)} />
          <InputField label="Contato 1" id="contato1" className="col-span-6 border-b-0" value={formData.contato1} onChange={(v) => updateField('contato1', v)} />
          <InputField label="Contato 2" id="contato2" className="col-span-6 border-r-0 border-b-0" value={formData.contato2} onChange={(v) => updateField('contato2', v)} />
        </div>

        {/* Operational */}
        <div className="grid grid-cols-24 border-b border-black bg-white items-stretch">
          <div className="col-span-3 border-r border-black p-1 flex flex-col">
            <label className="text-[9px] font-bold leading-tight uppercase">Classe econômica:</label>
            <div className="flex gap-1 justify-between flex-1 items-center px-0.5">
              <Checkbox id="cl_a" label="A" checked={!!checkedItems['cl_a']} onToggle={() => handleCheckboxToggle('cl_a')} />
              <Checkbox id="cl_m" label="M" checked={!!checkedItems['cl_m']} onToggle={() => handleCheckboxToggle('cl_m')} />
              <Checkbox id="cl_b" label="B" checked={!!checkedItems['cl_b']} onToggle={() => handleCheckboxToggle('cl_b')} />
            </div>
          </div>
          <div className="col-span-2 border-r border-black p-1 flex flex-col">
            <label className="text-[9px] font-bold leading-tight uppercase">Rota:</label>
            <input 
              className="w-full text-xs outline-none bg-transparent flex-1" 
              value={formData.rota}
              onChange={(e) => updateField('rota', e.target.value)}
            />
          </div>
          <div className="col-span-5 border-r border-black p-1 flex flex-col">
            <label className="text-[9px] font-bold leading-tight uppercase">Visita:</label>
            <div className="flex gap-1 flex-1 items-center">
              <Checkbox id="v_s" label="S" checked={!!checkedItems['v_s']} onToggle={() => handleCheckboxToggle('v_s')} />
              <Checkbox id="v_t" label="T" checked={!!checkedItems['v_t']} onToggle={() => handleCheckboxToggle('v_t')} />
              <Checkbox id="v_q" label="Q" checked={!!checkedItems['v_q']} onToggle={() => handleCheckboxToggle('v_q')} />
              <Checkbox id="v_q2" label="Q" checked={!!checkedItems['v_q2']} onToggle={() => handleCheckboxToggle('v_q2')} />
              <Checkbox id="v_s2" label="S" checked={!!checkedItems['v_s2']} onToggle={() => handleCheckboxToggle('v_s2')} />
              <Checkbox id="v_s3" label="S" checked={!!checkedItems['v_s3']} onToggle={() => handleCheckboxToggle('v_s3')} />
            </div>
          </div>
          <div className="col-span-2 border-r border-black p-1 flex flex-col">
            <label className="text-[9px] font-bold leading-tight uppercase">GTC:</label>
            <input 
              className="w-full text-xs outline-none bg-transparent flex-1" 
              value={formData.gtc}
              onChange={(e) => updateField('gtc', e.target.value)}
            />
          </div>
          <div className="col-span-6 border-r border-black p-1 flex flex-col">
            <label className="text-[9px] font-bold leading-tight uppercase">Key Account:</label>
            <input 
              className="w-full text-xs outline-none bg-transparent flex-1" 
              value={formData.keyAccount}
              onChange={(e) => updateField('keyAccount', e.target.value)}
            />
          </div>
          <div className="col-span-3 border-r border-black p-1 flex flex-col">
            <label className="text-[9px] font-bold leading-tight uppercase">Latitude:</label>
            <input 
              className="w-full text-xs outline-none bg-transparent flex-1" 
              value={formData.latitude}
              onChange={(e) => updateField('latitude', e.target.value)}
            />
          </div>
          <div className="col-span-3 p-1 flex flex-col">
            <label className="text-[9px] font-bold leading-tight uppercase">Longitude:</label>
            <input 
              className="w-full text-xs outline-none bg-transparent flex-1" 
              value={formData.longitude}
              onChange={(e) => updateField('longitude', e.target.value)}
            />
          </div>
        </div>

        {/* Complex Grid: Equipments, Vasilhame, Codes, Obs */}
        <div className="grid grid-cols-2 border-b border-black">
          {/* Left Side: nested layout */}
          <div className="flex flex-col border-r border-black">
              <div className="grid grid-cols-2 border-b border-black">
                {/* Equipment */}
                <div className="border-r border-black flex flex-col">
                  <div className="border-b border-black p-1 bg-white">
                    <span className="text-[10px] font-bold">PDV Tem equipamento:</span>
                  </div>
                  <div className="p-1 flex-1 flex flex-col gap-2">
                    <div className="grid grid-cols-12 gap-2">
                      <div className="col-span-4 flex flex-col">
                        <label className="text-[9px] font-bold">Qtd.</label>
                        <input 
                          className="w-full border border-black outline-none h-4 px-1 text-xs" 
                          value={formData.pdvEquipmentQtd}
                          onChange={(e) => updateField('pdvEquipmentQtd', e.target.value)}
                        />
                      </div>
                      <div className="col-span-8 flex items-center pt-3">
                        <Checkbox id="equip_nao" label="Não" checked={!!checkedItems['equip_nao']} onToggle={() => handleCheckboxToggle('equip_nao')} />
                      </div>
                    </div>
                    <div className="flex flex-col flex-1">
                      <label className="text-[9px] font-bold">N TAG:</label>
                      <input 
                        className="w-full h-5 border border-black outline-none px-1 text-xs" 
                        value={formData.pdvEquipmentNTag}
                        onChange={(e) => updateField('pdvEquipmentNTag', e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                
                {/* Vasilhame */}
                <div className="flex flex-col">
                  <div className="border-b border-black p-1 bg-white">
                    <span className="text-[10px] font-bold">PDV Tem Vasilhame?</span>
                  </div>
                  <div className="p-1 flex-1 flex flex-col gap-2">
                    <div className="grid grid-cols-12 gap-2">
                      <div className="col-span-4 flex flex-col">
                        <label className="text-[9px] font-bold">Qtd.</label>
                        <input 
                          className="w-full border border-black outline-none h-4 px-1 text-xs" 
                          value={formData.pdvVasilhameQtd}
                          onChange={(e) => updateField('pdvVasilhameQtd', e.target.value)}
                        />
                      </div>
                      <div className="col-span-8 flex items-center pt-3">
                        <Checkbox id="vasilh_nao" label="Não" checked={!!checkedItems['vasilh_nao']} onToggle={() => handleCheckboxToggle('vasilh_nao')} />
                      </div>
                    </div>
                    <div className="flex-1"></div>
                  </div>
                </div>
              </div>
 
             {/* Observations Area (spanning left half width) */}
             <div className="flex-1 flex flex-col">
                <div className="p-1 border-b border-black flex items-center gap-6">
                  <span className="text-[10px] font-bold">Observações:</span>
                  <Checkbox id="obs_aberto" label="Cliente Aberto" checked={!!checkedItems['obs_aberto']} onToggle={() => handleCheckboxToggle('obs_aberto')} />
                </div>
                <div className="flex-1 p-1">
                  <textarea 
                    id="observacoes"
                    className="w-full h-full min-h-[100px] resize-none outline-none text-sm bg-transparent"
                    value={formData.observacoes}
                    onChange={(e) => updateField('observacoes', e.target.value)}
                  />
                </div>
             </div>
          </div>

          {/* Right Side: Codes List */}
          <div className="p-1 text-[8.2px] font-semibold flex flex-col justify-center bg-white">
            <div className="grid grid-cols-12 gap-x-2 leading-tight">
              <div className="col-span-1 text-gray-400">01</div><div className="col-span-11">Duplicidade de cadastro</div>
              <div className="col-span-1 text-gray-400">02</div><div className="col-span-11">Duplicidade de endereço c/ vínculo, assumindo ativos</div>
              <div className="col-span-1 text-gray-500">03</div><div className="col-span-11">Duplicidade de endereço c/ vínculo, não assumindo ativos</div>
              <div className="col-span-1 text-gray-500">04</div><div className="col-span-11">Duplicidade de endereço c/ vínculo e s/ ativos</div>
              <div className="col-span-1 text-gray-500">05</div><div className="col-span-11">Duplicidade de endereço c/ vínculo, assumindo ativos e mudança de endereço do cliente antigo</div>
              <div className="col-span-1 text-gray-500">06</div><div className="col-span-11">Duplicidade de endereço c/ vínculo, não assumindo ativos e mudança de endereço do cliente antigo</div>
              <div className="col-span-1 text-gray-500">07</div><div className="col-span-11">Duplicidade de endereço c/ vínculo s/ ativos e mudança de endereço do cliente antigo</div>
              <div className="col-span-1 text-gray-500">08</div><div className="col-span-11">Duplicidade de endereço s/ vínculo, assumindo ativos</div>
              <div className="col-span-1 text-gray-500">09</div><div className="col-span-11">Duplicidade de endereço s/ vínculo, não assumindo ativos</div>
              <div className="col-span-1 text-gray-500">10</div><div className="col-span-11">Duplicidade de endereço s/ vínculo e s/ ativos</div>
              <div className="col-span-1 text-gray-500">11</div><div className="col-span-11">Duplicidade de endereço s/ vínculo, assumindo ativos e mudança de endereço do cliente antigo</div>
              <div className="col-span-1 text-gray-500">12</div><div className="col-span-11">Duplicidade de endereço s/ vínculo, não assumindo ativos e mudança de endereço do cliente antigo</div>
              <div className="col-span-1 text-gray-500">13</div><div className="col-span-11">Duplicidade de endereço s/ vínculo s/ ativos e mudança de endereço do cliente antigo</div>
              <div className="col-span-1 text-gray-500">14</div><div className="col-span-11">Falsa duplicidade.</div>
              <div className="col-span-1 text-gray-500">15</div><div className="col-span-11">Troca de Razão</div>
            </div>
          </div>
        </div>

        {/* Spacer row pointed by arrows */}
        <div className="h-4 border-b border-black bg-white">
        </div>

        {/* Exclusion Section */}
        <div className="bg-slate-200 text-black text-center border-b border-black py-0.5 text-[10px] font-bold uppercase">
          PREENCHIMENTO EXCLUSIVO PARA EXCLUSÃO
        </div>
        <div className="grid grid-cols-12 border-b border-black">
          <div className="col-span-7 border-r border-black p-1 flex flex-col">
            <span className="text-[9px] font-bold mb-1">Situação do cliente:</span>
            <div className="flex gap-4">
              <Checkbox id="sit_aberto" label="Aberto" checked={!!checkedItems['sit_aberto']} onToggle={() => handleCheckboxToggle('sit_aberto')} />
              <div className="flex items-center gap-1">
                <input 
                  className="w-12 h-4 border border-black text-center text-[10px] outline-none" 
                  value={formData.encerrouNegociacoes}
                  onChange={(e) => updateField('encerrouNegociacoes', e.target.value)}
                /> 
                <span className="text-[9px] font-bold">Encerrou negociações</span>
              </div>
              <Checkbox id="sit_fechado" label="Fechado definitivo" checked={!!checkedItems['sit_fechado']} onToggle={() => handleCheckboxToggle('sit_fechado')} />
            </div>
          </div>
          <div className="col-span-5 p-1 flex flex-col">
            <span className="text-[9px] font-bold mb-1">Possui ativos?</span>
            <div className="flex gap-8">
               <div className="flex items-center gap-1">
                 <input 
                   className="w-10 h-4 border border-black text-center text-[10px] outline-none" 
                   value={formData.ativosSim}
                   onChange={(e) => updateField('ativosSim', e.target.value)}
                 /> 
                 <Checkbox id="ativ_sim" label="Sim" checked={!!checkedItems['ativ_sim']} onToggle={() => handleCheckboxToggle('ativ_sim')} />
                </div>
               <div className="flex items-center gap-1">
                 <input 
                   className="w-10 h-4 border border-black text-center text-[10px] outline-none" 
                   value={formData.ativosNao}
                   onChange={(e) => updateField('ativosNao', e.target.value)}
                 /> 
                 <Checkbox id="ativ_nao" label="Não" checked={!!checkedItems['ativ_nao']} onToggle={() => handleCheckboxToggle('ativ_nao')} />
                </div>
            </div>
          </div>
        </div>

        {/* User Declaration */}
        <div className="bg-slate-200 text-center border-b border-black py-0.5 text-[10px] font-bold uppercase">
          DECLARAÇÃO DO CLIENTE
        </div>
        <div className="p-1 px-2 border-b border-black text-[8px] font-semibold bg-white leading-tight">
          Declaro que os dados acima, por mim fornecidos, estão de acordo com a verdade, posssuindo como finalidade o cadastramento junto a Solar Refrescos S/A.
        </div>

        {/* Signatures */}
        <div className="grid grid-cols-2 border-b border-black">
          <InputField label="Nome legível do pesquisador ou vendedor" id="pesquisador" className="border-r border-b-0" value={formData.pesquisador} onChange={(v) => updateField('pesquisador', v)} />
          <div className="p-1 border-b-0 flex flex-col">
            <label className="text-[10px] uppercase font-bold">Assinatura do pesquisador ou vendedor:</label>
            <div className="flex-1 mt-4 border-b border-black border-dashed mx-4"></div>
          </div>
        </div>
        <div className="grid grid-cols-2 border-b border-black">
          <div className="flex flex-col border-r border-black">
            <InputField label="Nome legível do cliente ou representante" id="clienteRep" className="border-b-0 border-r-0" value={formData.clienteRep} onChange={(v) => updateField('clienteRep', v)} />
          </div>
          <div className="flex flex-col">
            <div className="p-1 flex flex-col min-h-[60px] border-b border-black">
              <label className="text-[10px] uppercase font-bold">Assinatura do cliente ou representante:</label>
              <div className="flex-1 mt-4 border-b border-black border-dashed mx-4 text-center text-[10px] font-bold"></div>
            </div>
            <div className="p-1 flex items-center gap-2">
              <label htmlFor="cpfRep" className="text-[10px] uppercase font-bold whitespace-nowrap">CPF do representante:</label>
              <input
                type="text"
                id="cpfRep"
                className="flex-1 bg-transparent outline-none text-sm border-none focus:ring-0 p-0"
                value={formData.cpfRep || ''}
                onChange={(e) => updateField('cpfRep', e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 border-b border-black">
          <InputField label="Nome legível do solicitante" id="solicitante" className="border-r border-b-0" value={formData.solicitante} onChange={(v) => updateField('solicitante', v)} />
          <div className="p-1 flex flex-col">
            <label className="text-[10px] uppercase font-bold">Assinatura do solicitante:</label>
            <div className="flex-1 mt-4 border-b border-black border-dashed mx-4"></div>
          </div>
        </div>

        {/* Footer Area */}
        <div className="py-8 flex justify-center text-[11px] font-bold italic gap-2 items-end px-4">
          <input 
            className="w-64 border-b border-black text-center min-h-[14px] outline-none italic" 
            placeholder="Cidade"
            value={formData.footerCidade}
            onChange={(e) => updateField('footerCidade', e.target.value)}
          />
          <div className="flex items-baseline gap-1">
            <input 
              className="w-10 border-b border-black text-center min-h-[14px] outline-none" 
              maxLength={2}
              value={formData.footerDia}
              onChange={(e) => updateField('footerDia', e.target.value)}
            />
            <span>, de</span>
            <input 
              className="w-40 border-b border-black text-center min-h-[14px] outline-none italic" 
              placeholder="Mês"
              value={formData.footerMes}
              onChange={(e) => updateField('footerMes', e.target.value)}
            />
            <span>de</span>
            <input 
              className="w-16 border-b border-black text-center min-h-[14px] outline-none" 
              maxLength={4}
              value={formData.footerAno}
              onChange={(e) => updateField('footerAno', e.target.value)}
            />
          </div>
        </div>

        <div className="text-center font-bold text-[10px] pb-1 uppercase bg-white">
          CLASSIFICADO - USO RESTRITO
        </div>
      </div>

      {/* Print Styles */}
      <style>{`
        @page {
          size: A4 portrait;
          margin: 6mm !important;
        }
        @media print {
          * {
            box-sizing: border-box !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          html, body {
            width: 100% !important;
            height: 100% !important;
            margin: 0 !important;
            padding: 0 !important;
            background: white !important;
          }
          body {
            background: white !important;
            margin: 0 !important;
            padding: 0 !important;
            font-size: 9.5pt !important;
            line-height: 1.02 !important;
          }
          #print-button {
            display: none !important;
          }
          .min-h-screen {
            min-height: auto !important;
            padding: 0 !important;
            margin: 0 !important;
          }
          #form-content {
            border: 1px solid #000 !important;
            width: calc(100% - 12mm) !important;
            max-width: calc(100% - 12mm) !important;
            margin: 0 auto !important;
            padding: 0 !important;
            min-height: calc(100vh - 12mm) !important;
            box-shadow: none !important;
            overflow: visible !important;
            page-break-inside: avoid !important;
            break-inside: avoid-page !important;
            page-break-after: avoid !important;
            page-break-before: avoid !important;
            transform-origin: top center !important;
            transform: scale(0.94) !important;
          }
          #form-content, #form-content * {
            font-size: 8px !important;
            line-height: 1.02 !important;
          }
          #form-content .text-[7.5px] {
            font-size: 3px !important;
            line-height: 1 !important;
            letter-spacing: 0 !important;
            padding: 0 !important;
          }
          #form-content input,
          #form-content textarea,
          #form-content label,
          #form-content span,
          #form-content div {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          img, svg {
            max-width: 100% !important;
            height: auto !important;
          }
          .bg-gray-50, .bg-gray-100 {
            background-color: transparent !important;
          }
          .bg-slate-200 {
            background-color: #e2e8f0 !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          .bg-black {
            background-color: black !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          .shadow-xl {
            box-shadow: none !important;
          }
        }
      `}</style>
    </div>
  );
}
