export default function ErrorMessage({ children }: { children: React.ReactNode }) {
  return (
    <p className="bg-red-500 text-white font-bold text-sm text-center">
        {children}
    </p>
  )
}
