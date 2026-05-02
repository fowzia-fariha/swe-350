import { useState, useEffect } from 'react'
import { ClipboardList, Plus, Trash2 } from 'lucide-react'

export default function Results() {
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(true)
  const [adding, setAdding]   = useState(false)
  const [form, setForm]       = useState({ student_id: '', course_id: '', grade: '', semester: '' })

  const token = localStorage.getItem('token')
  const headers = { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }

  const load = () => {
    setLoading(true)
    fetch('/api/admin/results', { headers })
      .then(r => r.json())
      .then(d => { setResults(d); setLoading(false) })
      .catch(() => setLoading(false))
  }

  useEffect(load, [])

  const create = async () => {
    if (!form.student_id || !form.course_id || !form.grade) return
    await fetch('/api/admin/results', { method: 'POST', headers, body: JSON.stringify(form) })
    setForm({ student_id: '', course_id: '', grade: '', semester: '' })
    setAdding(false)
    load()
  }

  const remove = async (id) => {
    await fetch(`/api/admin/results/${id}`, { method: 'DELETE', headers })
    load()
  }

  const gradeColor = (g) => {
    if (!g) return 'bg-gray-100 text-gray-600'
    if (['A+','A','A-'].includes(g)) return 'bg-green-100 text-green-700'
    if (['B+','B','B-'].includes(g)) return 'bg-blue-100 text-blue-700'
    if (['C+','C','C-'].includes(g)) return 'bg-yellow-100 text-yellow-700'
    return 'bg-red-100 text-red-700'
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Results</h1>
        <button
          onClick={() => setAdding(a => !a)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus size={16} /> Add Result
        </button>
      </div>

      {adding && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 mb-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          <input placeholder="Student ID" value={form.student_id}
            onChange={e => setForm(f => ({ ...f, student_id: e.target.value }))}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm" />
          <input placeholder="Course ID" value={form.course_id}
            onChange={e => setForm(f => ({ ...f, course_id: e.target.value }))}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm" />
          <input placeholder="Grade (e.g. A+)" value={form.grade}
            onChange={e => setForm(f => ({ ...f, grade: e.target.value }))}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm" />
          <input placeholder="Semester (e.g. Fall 2025)" value={form.semester}
            onChange={e => setForm(f => ({ ...f, semester: e.target.value }))}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm" />
          <button onClick={create}
            className="col-span-2 md:col-span-4 px-4 py-2 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700">
            Save Result
          </button>
        </div>
      )}

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-500 uppercase text-xs">
            <tr>
              <th className="px-6 py-3 text-left">Student</th>
              <th className="px-6 py-3 text-left">Course</th>
              <th className="px-6 py-3 text-left">Grade</th>
              <th className="px-6 py-3 text-left">Semester</th>
              <th className="px-6 py-3 text-left">Status</th>
              <th className="px-6 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {loading ? (
              <tr><td colSpan={6} className="text-center py-10 text-gray-400">Loading...</td></tr>
            ) : results.length === 0 ? (
              <tr><td colSpan={6} className="text-center py-10 text-gray-400">
                <ClipboardList size={32} className="mx-auto mb-2 text-gray-300" />No results found
              </td></tr>
            ) : results.map((r, i) => (
              <tr key={r.id ?? i} className="hover:bg-gray-50">
                <td className="px-6 py-4 font-medium">{r.student_name}</td>
                <td className="px-6 py-4">{r.course_name}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${gradeColor(r.grade)}`}>
                    {r.grade}
                  </span>
                </td>
                <td className="px-6 py-4 text-gray-500">{r.semester}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${r.status === 'pending' ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'}`}>
                    {r.status ?? 'published'}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <button onClick={() => remove(r.id)} className="text-red-400 hover:text-red-600">
                    <Trash2 size={15} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}