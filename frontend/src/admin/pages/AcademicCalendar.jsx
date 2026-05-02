import { useState, useEffect } from 'react'
import { CalendarDays, Plus, Trash2 } from 'lucide-react'

export default function AcademicCalendar() {
  const [events, setEvents]   = useState([])
  const [loading, setLoading] = useState(true)
  const [form, setForm]       = useState({ title: '', description: '', date: '' })
  const [adding, setAdding]   = useState(false)

  const token = localStorage.getItem('token')
  const headers = { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }

  const load = () => {
    setLoading(true)
    fetch('/api/admin/calendar', { headers })
      .then(r => r.json())
      .then(d => { setEvents(d); setLoading(false) })
      .catch(() => setLoading(false))
  }

  useEffect(load, [])

  const submit = async () => {
    if (!form.title || !form.date) return
    await fetch('/api/admin/calendar', { method: 'POST', headers, body: JSON.stringify(form) })
    setForm({ title: '', description: '', date: '' })
    setAdding(false)
    load()
  }

  const remove = async (id) => {
    await fetch(`/api/admin/calendar/${id}`, { method: 'DELETE', headers })
    load()
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Academic Calendar</h1>
        <button
          onClick={() => setAdding(a => !a)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus size={16} /> Add Event
        </button>
      </div>

      {adding && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            placeholder="Event title"
            value={form.title}
            onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
          />
          <input
            type="date"
            value={form.date}
            onChange={e => setForm(f => ({ ...f, date: e.target.value }))}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
          />
          <input
            placeholder="Description (optional)"
            value={form.description}
            onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
          />
          <button
            onClick={submit}
            className="md:col-span-3 px-4 py-2 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700"
          >
            Save Event
          </button>
        </div>
      )}

      {loading ? (
        <p className="text-gray-400">Loading...</p>
      ) : events.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
          <CalendarDays size={40} className="mx-auto text-gray-300 mb-3" />
          <p className="text-gray-400">No events scheduled yet.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {events.map(e => (
            <div key={e.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 flex items-start gap-4">
              <div className="bg-blue-50 text-blue-700 rounded-lg px-3 py-2 text-center min-w-[56px]">
                <p className="text-xs font-medium uppercase">
                  {new Date(e.date).toLocaleString('default', { month: 'short' })}
                </p>
                <p className="text-xl font-bold leading-none mt-1">{new Date(e.date).getDate()}</p>
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-800">{e.title}</h3>
                {e.description && <p className="text-sm text-gray-500 mt-0.5">{e.description}</p>}
              </div>
              <button onClick={() => remove(e.id)} className="text-gray-300 hover:text-red-500 transition-colors">
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}