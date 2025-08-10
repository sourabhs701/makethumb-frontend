import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import axiosInstance from '@/lib/axios'
import { toast } from 'sonner'

const ProjectPage = () => {
  const { slug } = useParams()
  const navigate = useNavigate()
  const [project, setProject] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (slug) {
      fetchProject()
    }
  }, [slug])

  const fetchProject = async () => {
    try {
      setLoading(true)
      const response = await axiosInstance.get(`/projects/${slug}`)
      if (response.data.success) {
        setProject(response.data.data)

      }
    } catch (error) {
      console.error('Error fetching project:', error)
      if (error.response?.status === 404) {
        toast.error('Project not found')
        navigate('/projects')
      } else if (error.response?.status === 403) {
        toast.error('Access denied')
        navigate('/projects')
      } else {
        toast.error('Failed to fetch project')
      }
    } finally {
      setLoading(false)
    }
  }





  if (loading) {
    return (
      <>
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">Loading project...</div>
        </div>
      </>
    )
  }

  if (!project) {
    return (
      <>
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <p className="text-gray-500 mb-4">Project not found</p>
            <Button onClick={() => navigate('/projects')}>
              Back to Projects
            </Button>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-foreground">{project.slug}</h1>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => navigate('/projects')}
            >
              Back to Projects
            </Button>

          </div>
        </div>

        <div className="max-w-2xl">
          <Card className="bg-card text-card-foreground border border-border">
            <CardHeader>
              <CardTitle className="text-foreground">Project Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="slug" className="text-foreground">Project Slug</Label>

                <p className="mt-1 font-mono bg-muted p-2 rounded">
                  {project.slug}
                </p>
              </div>

              <div>
                <Label htmlFor="git_url" className="text-foreground">Git Repository URL</Label>

                <p className="mt-1 font-mono bg-muted p-2 rounded break-all">
                  {project.git_url || 'Not set'}
                </p>

              </div>

              <div>
                <Label className="text-foreground">Created At</Label>
                <p className="mt-1 text-muted-foreground">
                  {new Date(project.createdAt).toLocaleString()}
                </p>
              </div>

              <div>
                <Label>Visit Project</Label>
                <button
                  className="mt-1 text-blue-600 underline"
                  onClick={() => { window.open(`https://${project.slug}.makethumb.com`, '_blank') }}
                >
                  {`https://${project.slug}.makethumb.com`}
                </button>
              </div>

            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}

export default ProjectPage