import { redirect } from 'next/navigation'

export default function SecteursPage() {
  // Redirect to home since secteursIndex was removed
  redirect('/')
}