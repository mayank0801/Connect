import { ClipLoader } from 'react-spinners';

export default function Loader() {
  return (
    <div
      style={{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '7rem',
      }}
    >
      <ClipLoader
        color='blue'
        size={60}
        aria-label='Loading Spinner'
        data-testid='loader'
      />
    </div>
  );
}
