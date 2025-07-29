import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import supabase from '../supabase'

function Detail() {
  const { id } = useParams()
  const [crewmate, setCrewmate] = useState(null)

  useEffect(() => {
  const fetchCrewmate = async () => {
    console.log('Fetching crewmate with id:', id)

    const { data, error } = await supabase
      .from('crewmates')
      .select('*')
      .eq('id', id)
      .single()

    if (error) {
      console.error('Supabase error:', error)
    } else {
      setCrewmate(data)
    }
  }

  fetchCrewmate()
}, [id])

  if (!crewmate) return <div>Loading...</div>

  return (
    <div className="bg-white p-6 rounded-xl shadow w-full max-w-md mx-auto">
      <h1 className="text-3xl font-bold mb-4">Crewmate Detail</h1>
      <p><span className="font-semibold">Name:</span> {crewmate.name}</p>
      <p><span className="font-semibold">Color:</span> {crewmate.color}</p>
      <p><span className="font-semibold">Speed:</span> {crewmate.speed} mph</p>

      <Link
        to={`/edit/${crewmate.id}`}
        className="inline-block mt-6 bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
      >
        Edit Crewmate
      </Link>
    </div>
  )
}

export default Detail