import Link from 'next/link';

export default function Index() {
  /*
   * Replace the elements below with your own.
   *
   * Note: The corresponding styles are in the ./index.tailwind file.
   */
  return (
    <div>
      <h1>Dashboard</h1>
      <Link href="/chats">Go to Chats</Link>
    </div>
  );
}
