import { useLocation, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import supabase from '../supabase'

export default function EditCrewmate() {
  const { state } = useLocation()
  const navigate = useNavigate()

  const [name, setName] = useState(state?.name || '')
  const [color, setColor] = useState(state?.color || '')
  const [speed, setSpeed] = useState(state?.speed || '')
  const [error, setError] = useState(null)

  async function handleSubmit(e) {
    e.preventDefault()
    setError(null)

    if (!name || !color || !speed) {
      setError('All fields are required.')
      return
    }

    const speedNumber = parseFloat(speed)
    if (isNaN(speedNumber) || speedNumber < 0) {
      setError('Speed must be a positive number.')
      return
    }

    const { error: updateError } = await supabase
      .from('crewmates')
      .update({ name, color, speed: speedNumber })
      .eq('id', state.id)

    if (updateError) {
      console.error(updateError)
      setError('Failed to update crewmate.')
    } else {
      navigate('/gallery')
    }
  }

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Edit Crewmate</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Name</label>
          <input
            className="w-full border rounded p-2"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Crewmate name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Color</label>
          <input
            className="w-full border rounded p-2"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            placeholder="Color"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Speed (mph)</label>
          <input
            className="w-full border rounded p-2"
            value={speed}
            onChange={(e) => setSpeed(e.target.value)}
            placeholder="Speed"
          />
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Save Changes
        </button>
      </form>
    </div>
  )
}