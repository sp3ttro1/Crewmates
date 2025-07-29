import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import supabase from '../supabase'

export default function CreateCrewmate() {
  const [name, setName] = useState('')
  const [color, setColor] = useState('')
  const [speed, setSpeed] = useState('')
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()
    setError(null)

    // Basic input validation
    if (!name || !color || !speed) {
      setError('All fields are required.')
      return
    }

    const speedNumber = parseFloat(speed)
    if (isNaN(speedNumber) || speedNumber < 0) {
      setError('Speed must be a positive number.')
      return
    }

    const { error: insertError } = await supabase.from('crewmates').insert([
      { name, color, speed: speedNumber }
    ])

    if (insertError) {
      console.error('Insert error:', insertError)
      setError('Failed to create crewmate.')
    } else {
      navigate('/gallery')
    }
  }

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Create a New Crewmate</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Name</label>
          <input
            className="w-full border rounded p-2"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter crewmate name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Color</label>
          <input
            className="w-full border rounded p-2"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            placeholder="Enter crewmate color"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Speed (mph)</label>
          <input
            className="w-full border rounded p-2"
            value={speed}
            onChange={(e) => setSpeed(e.target.value)}
            placeholder="Enter speed (e.g. 4.5)"
          />
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Create Crewmate
        </button>
      </form>
    </div>
  )
}