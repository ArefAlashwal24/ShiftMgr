import { useEffect, useState } from 'react';
import { api } from '../api';
import type { Shift, Location } from '../types';
import { useSession } from '../store';

function CreateShift({
  userId,
  locations,
  refresh,
}: {
  userId: number;
  locations: Location[];
  refresh: () => void;
}) {
  const [loc, setLoc] = useState<number>(locations[0]?.id || 0);
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [notes, setNotes] = useState('');
  const [err, setErr] = useState('');

  const create = async () => {
    setErr('');
    try {
      await api.post('/shifts', {
        shift: {
          user_id: userId,
          location_id: loc,
          starts_at: new Date(start).toISOString(),
          ends_at: new Date(end).toISOString(),
          notes,
        },
      });
      setNotes('');
      refresh();
    } catch (e: any) {
      setErr(e?.response?.data?.errors?.join(', ') || 'Failed to create shift');
    }
  };

  return (
    <div className="flex flex-wrap gap-2 items-end mb-4">
      <select className="border p-2 rounded" value={loc} onChange={(e) => setLoc(Number(e.target.value))}>
        {locations.map((l) => (
          <option key={l.id} value={l.id}>
            {l.name}
          </option>
        ))}
      </select>
      <input type="datetime-local" className="border p-2 rounded" value={start} onChange={(e) => setStart(e.target.value)} />
      <input type="datetime-local" className="border p-2 rounded" value={end} onChange={(e) => setEnd(e.target.value)} />
      <input className="border p-2 rounded" placeholder="Notes" value={notes} onChange={(e) => setNotes(e.target.value)} />
      <button className="bg-black text-white px-3 py-2 rounded" onClick={create}>
        Add
      </button>
      {err && <div className="text-red-600 text-sm w-full">{err}</div>}
    </div>
  );
}

export default function Shifts() {
  const [shifts, setShifts] = useState<Shift[]>([]);
  const [locations, setLocations] = useState<Location[]>([]);
  const { user } = useSession();

  const refresh = async () => {
    const [s, l] = await Promise.all([api.get('/shifts'), api.get('/locations')]);
    setShifts(s.data);
    setLocations(l.data);
  };

  useEffect(() => {
    refresh();
  }, []);

  const logout = () => {
    localStorage.clear();
    window.location.href = '/login';
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Shifts</h1>
        <div className="flex items-center gap-4 text-sm">
          <div>Signed in: {user?.email} ({user?.role})</div>
          <button className="px-3 py-1 rounded border" onClick={logout}>Logout</button>
        </div>
      </div>

      {user && locations.length > 0 && (
        <CreateShift userId={user.id} locations={locations} refresh={refresh} />
      )}

      <div className="grid gap-3">
        {shifts.map((sh) => (
          <div key={sh.id} className="p-4 rounded-xl border">
            <div className="font-medium">
              {sh.user.email} · {sh.location.name}
            </div>
            <div>
              {new Date(sh.starts_at).toLocaleString()} → {new Date(sh.ends_at).toLocaleString()}
            </div>
            {sh.notes && <div className="text-sm opacity-70">{sh.notes}</div>}
          </div>
        ))}
      </div>
    </div>
  );
}
