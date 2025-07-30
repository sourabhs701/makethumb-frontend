import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import axiosInstance from '@/lib/axios'
import { toast } from 'sonner'

const ProjectPage = () => {
  const { slug } = useParams()
  const navigate = useNavigate()
  const [project, setProject] = useState(null)
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(false)
  const [formData, setFormData] = useState({
    git_url: '',
    slug: ''
  })

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
        setFormData({
          git_url: response.data.data.git_url || '',
          slug: response.data.data.slug || ''
        })
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

  const handleSave = async () => {
    try {
      const response = await axiosInstance.post(`/projects/${slug}`, formData)
      if (response.data.success) {
        toast.success('Project updated successfully')
        setProject(response.data.data)
        setEditing(false)

        // If slug was changed, navigate to new URL
        if (formData.slug !== slug) {
          navigate(`/projects/${response.data.data.slug}`)
        }
      }
    } catch (error) {
      console.error('Error updating project:', error)
      if (error.response?.data?.error) {
        toast.error(error.response.data.error)
      } else {
        toast.error('Failed to update project')
      }
    }
  }

  const handleCancel = () => {
    setFormData({
      git_url: project?.git_url || '',
      slug: project?.slug || ''
    })
    setEditing(false)
  }

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this project? This action cannot be undone.')) {
      return
    }

    try {
      const response = await axiosInstance.delete(`/projects/${slug}`)
      if (response.data.success) {
        toast.success('Project deleted successfully')
        navigate('/projects')
      }
    } catch (error) {
      console.error('Error deleting project:', error)
      toast.error('Failed to delete project')
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
          <h1 className="text-3xl font-bold">{project.slug}</h1>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => navigate('/projects')}
            >
              Back to Projects
            </Button>
            {!editing && (
              <>
                <Button onClick={() => setEditing(true)}>
                  Edit
                </Button>
                <Button
                  variant="destructive"
                  onClick={handleDelete}
                >
                  Delete
                </Button>
              </>
            )}
          </div>
        </div>

        <div className="max-w-2xl">
          <Card>
            <CardHeader>
              <CardTitle>Project Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="slug">Project Slug</Label>
                {editing ? (
                  <Input
                    id="slug"
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    placeholder="my-awesome-project"
                  />
                ) : (
                  <p className="mt-1 font-mono bg-gray-100 p-2 rounded">
                    {project.slug}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="git_url">Git Repository URL</Label>
                {editing ? (
                  <Input
                    id="git_url"
                    value={formData.git_url}
                    onChange={(e) => setFormData({ ...formData, git_url: e.target.value })}
                    placeholder="https://github.com/username/repository"
                  />
                ) : (
                  <p className="mt-1 font-mono bg-gray-100 p-2 rounded break-all">
                    {project.git_url || 'Not set'}
                  </p>
                )}
              </div>

              <div>
                <Label>Created At</Label>
                <p className="mt-1 text-gray-600">
                  {new Date(project.created_at).toLocaleString()}
                </p>
              </div>

              <div>
                <Label>Project ID</Label>
                <p className="mt-1 text-gray-600">#{project.id}</p>
              </div>

              {editing && (
                <div className="flex gap-2 pt-4">
                  <Button onClick={handleSave}>
                    Save Changes
                  </Button>
                  <Button
                    variant="outline"
                    onClick={handleCancel}
                  >
                    Cancel
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}

export default ProjectPage