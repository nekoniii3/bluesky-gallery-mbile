export function LoadingPopup() {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
      <div className="bg-white text-blue-500 px-6 py-4 rounded-xl flex items-center space-x-3 shadow-lg">
        <div className="w-5 h-5 border-2 border-t-white rounded-full animate-spin"></div>
          <p className="text-lg font-semibold">データ読み込み中...</p>
      </div>
    </div>
  )
}
