"use client"
import React from 'react'

import { useRequireWallet } from "@/hooks/useRequireWallet";
import { useFactoryList } from '@/hooks/useFactory';
import ProjectCard from '@/components/ProjectCard';


const page = () => {
    const { checked } = useRequireWallet();

    const { campaigns, isLoading, error } = useFactoryList();

    if (!checked) return <div className="animate-pulse text-muted">Loading...</div>;


  return (
    <div className="min-h-screen p-6 bg-background">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">All Projects</h1>

        {isLoading && <div>Loading projects…</div>}
        {error && <div className="text-red-500">Error: {String(error)}</div>}

        {!isLoading && campaigns?.length === 0 && (
          <div className="p-4 rounded border text-muted">No campaigns found.</div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          {campaigns?.map((c) => (
            <ProjectCard
              key={c.CampaignAddress}
              address={c.CampaignAddress}
              name={c.name}
              owner={c.owner}
              creationTime={c.creationTime}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default page