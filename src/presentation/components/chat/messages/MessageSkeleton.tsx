import React from 'react'
import { Skeleton } from '../../ui/skeleton'

export const MessageSkeleton = () => {
  return (
    <div className="flex flex-1 flex-col gap-4">
        <Skeleton className="h-12 w-7/12 rounded-xl self-end" />
        <Skeleton className="h-12 w-7/12 rounded-xl" />
        <Skeleton className="h-32 w-7/12 rounded-xl self-end" />
        <Skeleton className="h-12 w-6/12 rounded-xl" />
        <Skeleton className="h-12 w-6/12 rounded-xl self-end" />
    </div>
  )
}
