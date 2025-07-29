import { useEffect, useState } from 'react'
import supabase from '../supabase'
import { useNavigate, Link } from 'react-router-dom'

export default function Gallery() {
  const [crewmates, setCrewmates] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    fetchCrewmates()
  }, [])

  async function fetchCrewmates() {
    setLoading(true)
    const { data, error } = await supabase
      .from('crewmates')
      .select('*')
      .order('id', { ascending: true })

    if (error) {
      console.error('Error fetching:', error)
    } else {
      setCrewmates(data)
    }

    setLoading(false)
  }

  async function handleDelete(id) {
    const { error } = await supabase.from('crewmates').delete().eq('id', id)
    if (error) {
      console.error('Delete failed:', error)
    } else {
      setCrewmates((prev) => prev.filter((c) => c.id !== id))
    }
  }

  function handleEdit(crewmate) {
    navigate(`/edit/${crewmate.id}`, { state: crewmate })
  }

  if (loading) return <p className="p-4">Loading...</p>

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Crewmate Gallery</h1>
      {crewmates.length === 0 ? (
        <p>No crewmates yet.</p>
      ) : (
        <ul className="space-y-4">
          {crewmates.map((c) => (
            <li
              key={c.id}
              className="border p-4 rounded shadow-sm flex justify-between items-center"
            >
              <div className="flex flex-col">
                <Link
                  to={`/detail/${c.id}`}
                  className="text-blue-600 hover:underline font-semibold text-lg"
                >
                  {c.name}
                </Link>
                <p>Color: {c.color}</p>
                <p>Speed: {c.speed} mph</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(c)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(c.id)}
                  className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}