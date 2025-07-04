import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { getTimeAgo } from '../utils/DateFormat.jsx'

const Notification = () => {
  const [notifications, setNotifications] = useState([])
  const [offset, setOffset] = useState(0)
  const [hasMore, setHasMore] = useState(true)
  const limit = 10

  const fetchNotifications = async (append = false) => {
    try {
      const response = await axios.get(`/showNotification?limit=${limit}&offset=${append ? offset : 0}`)
      const newNotifs = response.data

      if (newNotifs.length < limit) setHasMore(false)
      if (append) {
        setNotifications((prev) => [...prev, ...newNotifs])
      } else {
        setNotifications(newNotifs)
      }
    } catch (error) {
      console.error("Failed to fetch notifications:", error)
    }
  }

  useEffect(() => {
    fetchNotifications()
  }, [])

  const loadMore = () => {
    const newOffset = offset + limit
    setOffset(newOffset)
    fetchNotifications(true)
  }

  const markAsRead = async (notif) => {
    try {
      await axios.patch(`/notifications/${notif.id}/read`)
      window.location.href = notif.url
    } catch (error) {
      console.error("Error marking as read notification", error)
    }
  }

  return (
    <div className=" p-4 rounded-lg shadow-sm">
      <h1 className="text-xl font-bold mb-4">Notifications</h1>
      {notifications.length === 0 ? (
        <p>No notifications.</p>
      ) : (
        <div className="px-5">

          {notifications.map((notif) => (
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
                    <>
                      :{" "}
                      <strong className="capitalize">
                        "{notif.params.post.title}"
                      </strong>
                    </>
                  )}
                </p>
                <p className="text-sm text-gray-400">
                  {getTimeAgo(notif.created_at)}
                </p>
              </div>
            </button>
          ))}
          {hasMore && (
            <div className="w-full">
            <button
              onClick={loadMore}
              className="mt-4 w-full px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 border border-gray-300 rounded-md shadow-sm hover:bg-gray-100 transition"
            >
              See more notifications
            </button>
          </div>
          
          
          
          )}
        </div>
      )}
    </div>
  )
}

export default Notification
