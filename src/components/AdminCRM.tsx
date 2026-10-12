import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { LeadInquiry, LeadStatus, PricingConfig } from '../types';
import { INITIAL_MOCK_CLIENTS } from '../data/mockCrmData';
import { IbaHandymanLogo, IbaTvMountingIcon } from './Logos';
import {
  LayoutDashboard,
  Users,
  Calendar,
  DollarSign,
  HelpCircle,
  Settings,
  Search,
  Filter,
  CheckCircle,
  Clock,
  MapPin,
  Phone,
  Mail,
  Camera,
  Edit3,
  RotateCcw,
  ShieldAlert,
  ChevronRight,
  X,
  Plus,
  Trash2,
  CalendarCheck,
} from 'lucide-react';

export const AdminCRM: React.FC = () => {
  const {
    language,
    setLanguage,
    t,
    leads,
    updateLeadStatus,
    updateLeadNotes,
    updateLeadAgreedPrice,
    confirmLeadSchedule,
    pricing,
    updatePricing,
    faqs,
    updateFaqs,
    resetDemoData,
    showToast,
  } = useApp();

  const [activeTab, setActiveTab] = useState<
    'leads' | 'clients' | 'calendar' | 'pricing' | 'faqs' | 'settings'
  >('leads');

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedLead, setSelectedLead] = useState<LeadInquiry | null>(null);

  // Notes and price edits inside modal
  const [editingNotes, setEditingNotes] = useState('');
  const [editingAgreedPrice, setEditingAgreedPrice] = useState<string>('');
  const [schedulingDateTime, setSchedulingDateTime] = useState('');

  // Editable pricing state
  const [editPricing, setEditPricing] = useState<PricingConfig>(pricing);

  const handleOpenLead = (lead: LeadInquiry) => {
    setSelectedLead(lead);
    setEditingNotes(lead.ownerNotes || '');
    setEditingAgreedPrice(lead.agreedPrice !== null ? lead.agreedPrice.toString() : '');
    setSchedulingDateTime(lead.confirmedDate || lead.requestedDate || '');
  };

  const handleSaveModalUpdates = () => {
    if (!selectedLead) return;
    updateLeadNotes(selectedLead.id, editingNotes);
    const parsedPrice = editingAgreedPrice ? parseFloat(editingAgreedPrice) : null;
    updateLeadAgreedPrice(selectedLead.id, isNaN(parsedPrice as number) ? null : parsedPrice);
    showToast(language === 'ru' ? 'Заявка успешно обновлена' : 'Inquiry updated successfully');
    setSelectedLead(prev => (prev ? { ...prev, ownerNotes: editingNotes, agreedPrice: parsedPrice } : null));
  };

  const handleConfirmSchedule = () => {
    if (!selectedLead || !schedulingDateTime) return;
    confirmLeadSchedule(selectedLead.id, schedulingDateTime);
    showToast(language === 'ru' ? 'Выезд подтверждён и внесён в график' : 'Appointment confirmed in calendar');
    setSelectedLead(prev =>
      prev
        ? {
            ...prev,
            isDateConfirmed: true,
            confirmedDate: schedulingDateTime,
            status: prev.status === 'new' || prev.status === 'contacted' ? 'scheduled' : prev.status,
          }
        : null
    );
  };

  const handleSavePricing = (e: React.FormEvent) => {
    e.preventDefault();
    updatePricing(editPricing);
  };

  const filteredLeads = leads.filter(lead => {
    const matchesSearch =
      `${lead.firstName} ${lead.lastName || ''} ${lead.phone} ${lead.serviceTitle} ${lead.zip}`
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || lead.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: LeadStatus) => {
    const label = t.crm.statusLabels[status] || status;
    switch (status) {
      case 'new':
        return <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-amber-100 text-amber-900 border border-amber-300">● {label}</span>;
      case 'contacted':
        return <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-blue-100 text-blue-900 border border-blue-200">{label}</span>;
      case 'estimate_sent':
        return <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-purple-100 text-purple-900 border border-purple-200">{label}</span>;
      case 'approved':
        return <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-900 border border-emerald-200">{label}</span>;
      case 'scheduled':
        return <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-indigo-100 text-indigo-900 border border-indigo-200">{label}</span>;
      case 'completed':
        return <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-slate-200 text-slate-800">{label}</span>;
      case 'cancelled':
        return <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-rose-100 text-rose-900">{label}</span>;
      default:
        return <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-slate-100 text-slate-800">{label}</span>;
    }
  };

  return (
    <div className="bg-slate-100 min-h-screen pb-16">
      {/* Top Banner: Stage 1 Demo Warning */}
      <div className="bg-slate-900 text-white border-b border-slate-800 px-4 py-3 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <IbaHandymanLogo size="sm" theme="dark" />
            <div className="h-5 w-px bg-slate-700 hidden sm:block" />
            <div>
              <span className="font-extrabold text-xs sm:text-sm text-amber-400 block sm:inline mr-2">
                {t.crm.bannerTitle}
              </span>
              <span className="text-[11px] text-slate-400">
                {t.crm.bannerSubtitle}
              </span>
            </div>
          </div>

          {/* CRM Language Toggle (Russian default) */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400">Язык панели:</span>
            <div className="flex items-center bg-slate-800 rounded-lg p-0.5 border border-slate-700">
              <button
                onClick={() => setLanguage('ru')}
                className={`px-2 py-0.5 text-xs font-bold rounded ${
                  language === 'ru' ? 'bg-amber-400 text-slate-950' : 'text-slate-400 hover:text-white'
                }`}
              >
                RU
              </button>
              <button
                onClick={() => setLanguage('en')}
                className={`px-2 py-0.5 text-xs font-bold rounded ${
                  language === 'en' ? 'bg-amber-400 text-slate-950' : 'text-slate-400 hover:text-white'
                }`}
              >
                EN
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-6">
        {/* CRM Navigation Tabs */}
        <div className="bg-white rounded-2xl p-2 border border-slate-200 shadow-xs mb-6 overflow-x-auto flex gap-1">
          {[
            { id: 'leads', label: t.crm.tabs.leads, icon: LayoutDashboard },
            { id: 'clients', label: t.crm.tabs.clients, icon: Users },
            { id: 'calendar', label: t.crm.tabs.calendar, icon: Calendar },
            { id: 'pricing', label: t.crm.tabs.pricing, icon: DollarSign },
            { id: 'faqs', label: t.crm.tabs.faqs, icon: HelpCircle },
            { id: 'settings', label: t.crm.tabs.settings, icon: Settings },
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-3.5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-slate-900 text-amber-400 shadow-xs'
                    : 'text-slate-600 hover:text-slate-950 hover:bg-slate-50'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
                {tab.id === 'leads' && (
                  <span className="text-[10px] bg-amber-400 text-slate-950 px-1.5 py-0.2 rounded-full font-black">
                    {leads.filter(l => l.status === 'new').length}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Tab 1: Leads / Inquiries */}
        {activeTab === 'leads' && (
          <div className="space-y-4">
            {/* Search & Filter Toolbar */}
            <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-2xs flex flex-col sm:flex-row gap-3 items-center justify-between">
              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder={t.crm.leadsView.searchPlaceholder}
                  className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50 focus:outline-hidden focus:ring-2 focus:ring-amber-400 font-medium"
                />
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <Filter className="w-4 h-4 text-slate-400" />
                <select
                  value={statusFilter}
                  onChange={e => setStatusFilter(e.target.value)}
                  className="text-xs p-2 rounded-xl border border-slate-200 bg-slate-50 font-medium"
                >
                  <option value="all">{t.crm.leadsView.filterAll}</option>
                  <option value="new">New ({leads.filter(l => l.status === 'new').length})</option>
                  <option value="contacted">Contacted</option>
                  <option value="estimate_sent">Estimate Sent</option>
                  <option value="approved">Approved</option>
                  <option value="scheduled">Scheduled</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
            </div>

            {/* Table of Leads */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-slate-700 font-bold border-b border-slate-200">
                    <tr>
                      <th className="py-3 px-4">{t.crm.leadsView.tableHeaderName}</th>
                      <th className="py-3 px-4">{t.crm.leadsView.tableHeaderService}</th>
                      <th className="py-3 px-4">{t.crm.leadsView.tableHeaderEstimate}</th>
                      <th className="py-3 px-4">{t.crm.leadsView.tableHeaderDate}</th>
                      <th className="py-3 px-4">{t.crm.leadsView.tableHeaderStatus}</th>
                      <th className="py-3 px-4 text-right">{t.crm.leadsView.tableHeaderActions}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredLeads.map(lead => (
                      <tr
                        key={lead.id}
                        className="hover:bg-slate-50/80 transition-colors cursor-pointer"
                        onClick={() => handleOpenLead(lead)}
                      >
                        <td className="py-3.5 px-4">
                          <div className="font-bold text-slate-900">
                            {lead.firstName} {lead.lastName || ''}
                          </div>
                          <div className="text-[11px] text-slate-500 flex items-center gap-1">
                            <Phone className="w-3 h-3" />
                            <span>{lead.phone}</span>
                            <span className="text-slate-300">•</span>
                            <span>ZIP {lead.zip}</span>
                          </div>
                        </td>

                        <td className="py-3.5 px-4 max-w-xs">
                          <div className="font-semibold text-slate-800">{lead.serviceTitle}</div>
                          <div className="text-[11px] text-slate-500 line-clamp-1">{lead.description}</div>
                        </td>

                        <td className="py-3.5 px-4 font-bold text-slate-900">
                          {lead.agreedPrice !== null ? (
                            <span className="text-emerald-700">${lead.agreedPrice} (Agreed)</span>
                          ) : lead.estimatedPrice !== null ? (
                            `$${lead.estimatedPrice} (Est)`
                          ) : (
                            <span className="text-slate-400">Custom</span>
                          )}
                        </td>

                        <td className="py-3.5 px-4">
                          {lead.isDateConfirmed && lead.confirmedDate ? (
                            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700">
                              <CalendarCheck className="w-3.5 h-3.5" />
                              <span>{lead.confirmedDate}</span>
                            </span>
                          ) : lead.requestedDate ? (
                            <span className="text-[11px] text-slate-600">
                              Req: {lead.requestedDate} ({lead.requestedTimeSlot})
                            </span>
                          ) : (
                            <span className="text-[11px] text-slate-400">Flexible</span>
                          )}
                        </td>

                        <td className="py-3.5 px-4">
                          {getStatusBadge(lead.status)}
                        </td>

                        <td className="py-3.5 px-4 text-right">
                          <button
                            onClick={e => {
                              e.stopPropagation();
                              handleOpenLead(lead);
                            }}
                            className="px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-xs font-bold transition-colors"
                          >
                            Open
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {filteredLeads.length === 0 && (
                <div className="p-8 text-center text-xs text-slate-400">
                  {t.crm.leadsView.emptyMessage}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Tab 2: Clients */}
        {activeTab === 'clients' && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
            <h3 className="font-extrabold text-slate-900 text-base mb-4">
              Client Directory (Sample Records)
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-700 font-bold border-b border-slate-200">
                  <tr>
                    <th className="py-3 px-4">Client Name</th>
                    <th className="py-3 px-4">Contact</th>
                    <th className="py-3 px-4">Location</th>
                    <th className="py-3 px-4">Jobs</th>
                    <th className="py-3 px-4">Total Revenue</th>
                    <th className="py-3 px-4">Notes</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {INITIAL_MOCK_CLIENTS.map(c => (
                    <tr key={c.id}>
                      <td className="py-3 px-4 font-bold text-slate-900">{c.name}</td>
                      <td className="py-3 px-4">{c.phone}</td>
                      <td className="py-3 px-4">{c.zip}</td>
                      <td className="py-3 px-4 font-semibold">{c.totalJobs}</td>
                      <td className="py-3 px-4 font-bold text-slate-900">${c.totalRevenue}</td>
                      <td className="py-3 px-4 text-slate-500 max-w-xs">{c.notes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 3: Calendar / Scheduling (Separates unconfirmed from confirmed!) */}
        {activeTab === 'calendar' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
              <h3 className="font-extrabold text-slate-900 text-lg mb-2">
                {t.crm.calendarView.title}
              </h3>
              <p className="text-xs text-slate-500 mb-6">
                Appointments requested by clients require route verification before moving to confirmed schedule.
              </p>

              {/* Unconfirmed Requests List */}
              <div className="mb-8">
                <h4 className="text-xs font-extrabold text-amber-800 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-amber-600" />
                  <span>{t.crm.calendarView.unconfirmedSection}</span>
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {leads
                    .filter(l => !l.isDateConfirmed && l.requestedDate)
                    .map(l => (
                      <div
                        key={l.id}
                        className="p-4 rounded-xl border border-amber-200 bg-amber-50/50 flex items-start justify-between gap-3"
                      >
                        <div className="space-y-1">
                          <div className="font-bold text-slate-900 text-xs">
                            {l.firstName} {l.lastName || ''} — {l.serviceTitle}
                          </div>
                          <div className="text-[11px] text-slate-600">
                            Requested: <span className="font-semibold">{l.requestedDate}</span> ({l.requestedTimeSlot})
                          </div>
                          <div className="text-[11px] text-slate-500">
                            {l.phone} • ZIP {l.zip}
                          </div>
                        </div>

                        <button
                          onClick={() => handleOpenLead(l)}
                          className="px-3 py-1.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs rounded-lg shrink-0 transition-colors"
                        >
                          Review & Confirm
                        </button>
                      </div>
                    ))}

                  {leads.filter(l => !l.isDateConfirmed && l.requestedDate).length === 0 && (
                    <div className="p-4 bg-slate-50 rounded-xl text-xs text-slate-400">
                      {t.crm.calendarView.noPending}
                    </div>
                  )}
                </div>
              </div>

              {/* Confirmed Scheduled Jobs List */}
              <div>
                <h4 className="text-xs font-extrabold text-emerald-800 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  <span>{t.crm.calendarView.confirmedSection}</span>
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {leads
                    .filter(l => l.isDateConfirmed && l.confirmedDate)
                    .map(l => (
                      <div
                        key={l.id}
                        className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/50 flex items-start justify-between gap-3"
                      >
                        <div className="space-y-1">
                          <div className="font-bold text-slate-900 text-xs">
                            {l.firstName} {l.lastName || ''}
                          </div>
                          <div className="text-[11px] text-emerald-800 font-bold">
                            Date: {l.confirmedDate}
                          </div>
                          <div className="text-[11px] text-slate-600">
                            {l.streetAddress || `ZIP ${l.zip}`} • {l.phone}
                          </div>
                          <div className="text-[11px] text-slate-500 font-medium">
                            {l.serviceTitle} • ${l.agreedPrice || l.estimatedPrice}
                          </div>
                        </div>

                        <button
                          onClick={() => handleOpenLead(l)}
                          className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-lg shrink-0 transition-colors"
                        >
                          View Job
                        </button>
                      </div>
                    ))}

                  {leads.filter(l => l.isDateConfirmed && l.confirmedDate).length === 0 && (
                    <div className="p-4 bg-slate-50 rounded-xl text-xs text-slate-400">
                      {t.crm.calendarView.noConfirmed}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: Pricing & Services Editor (Synchronizes live with client calculator!) */}
        {activeTab === 'pricing' && (
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm">
            <div className="border-b border-slate-100 pb-4 mb-6">
              <h3 className="font-extrabold text-slate-900 text-lg">
                {t.crm.pricingView.title}
              </h3>
              <p className="text-xs text-amber-700 mt-1 font-medium">
                {t.crm.pricingView.subtitle}
              </p>
            </div>

            <form onSubmit={handleSavePricing} className="space-y-6">
              {/* Minimum Order */}
              <div className="max-w-xs">
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  {t.crm.pricingView.minOrderLabel}
                </label>
                <input
                  type="number"
                  value={editPricing.minimumOrder}
                  onChange={e =>
                    setEditPricing(prev => ({ ...prev, minimumOrder: Number(e.target.value) }))
                  }
                  className="w-full px-3 py-2 text-xs font-bold rounded-xl border border-slate-200 bg-slate-50"
                />
              </div>

              {/* TV Size Base Rates */}
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-2">
                  {t.crm.pricingView.tvSizes}
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                  {Object.entries(editPricing.tvSizes).map(([k, v]) => (
                    <div key={k} className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                      <span className="text-[11px] font-semibold text-slate-600 block mb-1">
                        {v.label}
                      </span>
                      <input
                        type="number"
                        value={v.price}
                        onChange={e => {
                          const val = Number(e.target.value);
                          setEditPricing(prev => ({
                            ...prev,
                            tvSizes: {
                              ...prev.tvSizes,
                              [k]: { ...v, price: val },
                            },
                          }));
                        }}
                        className="w-full px-2 py-1 text-xs font-bold rounded-lg border border-slate-200 bg-white"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Wall Surcharges */}
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-2">
                  {t.crm.pricingView.materials}
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {Object.entries(editPricing.wallMaterials)
                    .filter(([_, conf]) => !conf.customQuote && conf.surcharge !== null)
                    .map(([k, conf]) => (
                      <div key={k} className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                        <span className="text-[11px] font-semibold text-slate-600 block mb-1">
                          {conf.nameEn}
                        </span>
                        <input
                          type="number"
                          value={conf.surcharge || 0}
                          onChange={e => {
                            const val = Number(e.target.value);
                            setEditPricing(prev => ({
                              ...prev,
                              wallMaterials: {
                                ...prev.wallMaterials,
                                [k]: { ...conf, surcharge: val },
                              },
                            }));
                          }}
                          className="w-full px-2 py-1 text-xs font-bold rounded-lg border border-slate-200 bg-white"
                        />
                      </div>
                    ))}
                </div>
              </div>

              {/* Fireplace & Wiring */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-xs font-bold text-slate-800 block mb-1">
                    Fireplace Mounting Surcharge ($)
                  </span>
                  <input
                    type="number"
                    value={editPricing.fireplaceSurcharge}
                    onChange={e =>
                      setEditPricing(prev => ({ ...prev, fireplaceSurcharge: Number(e.target.value) }))
                    }
                    className="w-full px-2 py-1.5 text-xs font-bold rounded-lg border border-slate-200 bg-white"
                  />
                </div>

                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-xs font-bold text-slate-800 block mb-1">
                    Paintable Raceway Channel ($)
                  </span>
                  <input
                    type="number"
                    value={editPricing.wireManagement.raceway}
                    onChange={e =>
                      setEditPricing(prev => ({
                        ...prev,
                        wireManagement: { ...prev.wireManagement, raceway: Number(e.target.value) },
                      }))
                    }
                    className="w-full px-2 py-1.5 text-xs font-bold rounded-lg border border-slate-200 bg-white"
                  />
                </div>

                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-xs font-bold text-slate-800 block mb-1">
                    In-Wall Signal Pass-Through Kit ($)
                  </span>
                  <input
                    type="number"
                    value={editPricing.wireManagement.inWallLowVoltage}
                    onChange={e =>
                      setEditPricing(prev => ({
                        ...prev,
                        wireManagement: { ...prev.wireManagement, inWallLowVoltage: Number(e.target.value) },
                      }))
                    }
                    className="w-full px-2 py-1.5 text-xs font-bold rounded-lg border border-slate-200 bg-white"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="px-6 py-3 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs rounded-xl shadow-xs transition-colors"
              >
                {t.crm.pricingView.saveChangesBtn}
              </button>
            </form>
          </div>
        )}

        {/* Tab 5: FAQ Editor */}
        {activeTab === 'faqs' && (
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-extrabold text-slate-900 text-base">
                Knowledge Base & FAQ Items
              </h3>
              <span className="text-xs text-slate-500">
                Active in customer Quick Helper & FAQ section
              </span>
            </div>

            <div className="space-y-3">
              {faqs.map(faq => (
                <div key={faq.id} className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                  <div className="font-bold text-slate-900 text-xs">
                    EN: {faq.questionEn}
                  </div>
                  <div className="font-medium text-slate-700 text-xs">
                    RU: {faq.questionRu}
                  </div>
                  <div className="text-[11px] text-slate-500 border-t border-slate-200 pt-2">
                    {faq.answerEn}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 6: Settings & Stage 2 Backend Readiness */}
        {activeTab === 'settings' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200 shadow-sm">
              <h3 className="font-extrabold text-slate-900 text-base mb-4">
                {t.crm.settingsView.title}
              </h3>

              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between gap-4 mb-6">
                <div>
                  <span className="font-bold text-xs text-slate-900 block">Reset Session State</span>
                  <span className="text-[11px] text-slate-500">
                    Restores default demo leads, pricing tiers, and sample clients.
                  </span>
                </div>
                <button
                  onClick={resetDemoData}
                  className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>{t.crm.settingsView.resetDataBtn}</span>
                </button>
              </div>

              {/* Stage 2 Readiness Checklist */}
              <div className="border-t border-slate-200 pt-6">
                <h4 className="font-extrabold text-slate-900 text-sm mb-3 flex items-center gap-2">
                  <ShieldAlert className="w-4 h-4 text-amber-600" />
                  <span>{t.crm.settingsView.stage2PlanTitle}</span>
                </h4>

                <div className="space-y-2 text-xs text-slate-700">
                  <div className="p-3 bg-slate-50 rounded-xl flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-amber-500" />
                    <span>{t.crm.settingsView.item1}</span>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-amber-500" />
                    <span>{t.crm.settingsView.item2}</span>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-amber-500" />
                    <span>{t.crm.settingsView.item3}</span>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-amber-500" />
                    <span>{t.crm.settingsView.item4}</span>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-amber-500" />
                    <span>{t.crm.settingsView.item5}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Inquiry Detail Modal */}
      {selectedLead && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-7 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto space-y-6">
            <div className="flex items-start justify-between pb-4 border-b border-slate-100">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Lead ID: #{selectedLead.id} • Source: {selectedLead.source}
                </span>
                <h3 className="text-xl font-extrabold text-slate-900 mt-0.5">
                  {selectedLead.firstName} {selectedLead.lastName || ''}
                </h3>
              </div>
              <button
                onClick={() => setSelectedLead(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-900 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Customer & Location */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-3.5 bg-slate-50 rounded-xl space-y-1">
                <span className="font-bold text-slate-800 block mb-1">Customer Info</span>
                <div className="flex items-center gap-1.5 text-slate-700">
                  <Phone className="w-3.5 h-3.5 text-slate-400" />
                  <span>{selectedLead.phone}</span>
                </div>
                {selectedLead.email && (
                  <div className="flex items-center gap-1.5 text-slate-700">
                    <Mail className="w-3.5 h-3.5 text-slate-400" />
                    <span>{selectedLead.email}</span>
                  </div>
                )}
                <div className="text-[11px] text-slate-500 mt-1">
                  Preferred Contact: <span className="font-semibold uppercase">{selectedLead.preferredContactMethod}</span>
                </div>
              </div>

              <div className="p-3.5 bg-slate-50 rounded-xl space-y-1">
                <span className="font-bold text-slate-800 block mb-1">Service Address</span>
                <div className="flex items-start gap-1.5 text-slate-700">
                  <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                  <span>{selectedLead.streetAddress || 'Street address not specified'}</span>
                </div>
                <div className="font-semibold text-slate-900">
                  ZIP: {selectedLead.zip} (Raleigh Triangle)
                </div>
              </div>
            </div>

            {/* Scope & Description */}
            <div className="p-4 bg-slate-50 rounded-xl space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900">{selectedLead.serviceTitle}</span>
                {getStatusBadge(selectedLead.status)}
              </div>
              <p className="text-slate-700 leading-relaxed bg-white p-3 rounded-lg border border-slate-200">
                {selectedLead.description}
              </p>

              {/* Photos attached */}
              {selectedLead.photos && selectedLead.photos.length > 0 && (
                <div className="pt-2">
                  <span className="text-[11px] font-bold text-slate-600 block mb-1.5 flex items-center gap-1">
                    <Camera className="w-3.5 h-3.5 text-amber-600" />
                    <span>Attached Project Photos ({selectedLead.photos.length}):</span>
                  </span>
                  <div className="flex gap-2">
                    {selectedLead.photos.map((src, i) => (
                      <img
                        key={i}
                        src={src}
                        alt="Customer upload"
                        className="w-20 h-20 object-cover rounded-lg border border-slate-200 shadow-2xs"
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Status & Agreed Price Controls */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block font-bold text-slate-800 mb-1">
                  {t.crm.leadsView.changeStatus}
                </label>
                <select
                  value={selectedLead.status}
                  onChange={e => {
                    const newStatus = e.target.value as LeadStatus;
                    updateLeadStatus(selectedLead.id, newStatus);
                    setSelectedLead(prev => (prev ? { ...prev, status: newStatus } : null));
                  }}
                  className="w-full p-2.5 rounded-xl border border-slate-200 bg-white font-semibold text-slate-900"
                >
                  <option value="new">New (Новая)</option>
                  <option value="contacted">Contacted (Связались)</option>
                  <option value="estimate_sent">Estimate Sent (Смета отправлена)</option>
                  <option value="approved">Approved (Согласована)</option>
                  <option value="scheduled">Scheduled (В графике)</option>
                  <option value="completed">Completed (Выполнена)</option>
                  <option value="cancelled">Cancelled (Отменена)</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-800 mb-1">
                  {t.crm.leadsView.agreedPrice}
                </label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    value={editingAgreedPrice}
                    onChange={e => setEditingAgreedPrice(e.target.value)}
                    placeholder={selectedLead.estimatedPrice ? `$${selectedLead.estimatedPrice}` : 'e.g. 150'}
                    className="w-full px-3 py-2 text-xs font-bold rounded-xl border border-slate-200 bg-white"
                  />
                  <button
                    type="button"
                    onClick={handleSaveModalUpdates}
                    className="px-3 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold shrink-0"
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>

            {/* Scheduling Box */}
            <div className="p-4 bg-amber-50 rounded-xl border border-amber-200 space-y-2 text-xs">
              <span className="font-extrabold text-amber-950 block">
                {t.crm.leadsView.confirmBookingNotice}
              </span>
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="text"
                  value={schedulingDateTime}
                  onChange={e => setSchedulingDateTime(e.target.value)}
                  placeholder="e.g. 2026-10-15 10:00 AM"
                  className="flex-1 px-3 py-2 text-xs rounded-xl border border-amber-300 bg-white font-medium"
                />
                <button
                  type="button"
                  onClick={handleConfirmSchedule}
                  className="px-4 py-2 bg-amber-400 hover:bg-amber-300 text-slate-950 rounded-xl text-xs font-bold transition-colors"
                >
                  {t.crm.leadsView.saveBookingBtn}
                </button>
              </div>
            </div>

            {/* Internal Notes */}
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1">
                {t.crm.leadsView.internalNotes}
              </label>
              <textarea
                rows={2}
                value={editingNotes}
                onChange={e => setEditingNotes(e.target.value)}
                placeholder="Add private craftsman notes regarding studs, anchors, paint codes, or customer requests..."
                className="w-full p-3 text-xs rounded-xl border border-slate-200 bg-slate-50 text-slate-900"
              />
              <button
                type="button"
                onClick={handleSaveModalUpdates}
                className="mt-2 px-3.5 py-1.5 bg-slate-900 text-white rounded-lg text-xs font-bold"
              >
                {t.crm.leadsView.saveNotes}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
