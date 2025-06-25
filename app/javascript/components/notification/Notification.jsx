import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { getTimeAgo } from '../utils/DateFormat.jsx'

const Notification = () => {
  const [notifications, setNotifications] = useState([])

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get("/showNotification")
        setNotifications(response.data)
      } catch (error) {
        console.error("Failed to fetch notifications:", error)
      }
    }

    fetchNotifications()

    const intervalId = setInterval(fetchNotifications, 5000)
    return () => clearInterval(intervalId)
  }, [])

  const markAsRead = async (notif) => {
    try {
      await axios.patch(`/notifications/${notif.id}/read`)
      window.location.href = notif.url
    } catch (error) {
      console.error("Error marking as read notification", error)
    }
  }

  return (
    <div className="p-4 rounded-lg shadow-sm">
      <h1 className="text-xl font-bold mb-4">Notifications</h1>
      {notifications.length === 0 ? (
        <p>No notifications.</p>
      ) : (
        notifications.map((notif) => (
          <button
            key={notif.id}
            onClick={() => markAsRead(notif)}
            className={`p-4 ${
              notif.read_at ? "bg-white" : "bg-gray-200"
            } border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700 flex items-center gap-4 w-full text-left`}
          >
            {/* Profile Picture */}
            {notif.actor?.name ? (
              <img
                src={notif.actor.coverimg_url || "/assets/img/image.png"}
                alt={notif.actor.name}
                className="w-12 h-12 rounded-full object-cover"
              />
            ) : (
              <img
                src="/assets/img/image.png"
                alt="Default profile"
                className="w-12 h-12 rounded-full object-cover"
              />
            )}

            {/* Message and Time */}
            <div className="flex flex-col">
              <p className="text-sm">
                {notif.message}
                {notif.params?.post?.title && (
                  <>: <strong className="capitalize">"{notif.params.post.title}"</strong></>
                )}
              </p>
              <p className="text-sm text-gray-400">
                {getTimeAgo(notif.created_at)}
              </p>
            </div>
          </button>
        ))
      )}
    </div>
  )
}

export default Notification
