'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { toast } from 'sonner';
import { format } from 'date-fns';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { UserPlus, Trash2, Loader2, Shield, Mail, Lock } from 'lucide-react';

interface AllowedAdmin {
  id: string;
  email: string;
  name: string | null;
  addedBy: string | null;
  createdAt: string;
}

export default function TeamPage() {
  const { data: session } = useSession();
  const [allowedAdmins, setAllowedAdmins] = useState<AllowedAdmin[]>([]);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  
  const [newEmail, setNewEmail] = useState('');
  const [newName, setNewName] = useState('');

  // Check if current user is SUPER_ADMIN
  const isSuperAdmin = (session?.user as any)?.role === 'SUPER_ADMIN';

  const fetchAllowedAdmins = async () => {
    try {
      const response = await fetch('/api/admin/allowed-admins');
      if (!response.ok) throw new Error('Failed to fetch');
      const data = await response.json();
      setAllowedAdmins(data);
    } catch (error) {
      console.error('Error fetching allowed admins:', error);
      toast.error('Failed to load team members');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllowedAdmins();
  }, []);

  const handleAddAdmin = async () => {
    if (!newEmail) {
      toast.error('Please enter an email address');
      return;
    }

    setAdding(true);
    try {
      const response = await fetch('/api/admin/allowed-admins', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: newEmail, name: newName }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to add admin');
      }

      toast.success('Admin added successfully');
      setNewEmail('');
      setNewName('');
      setDialogOpen(false);
      fetchAllowedAdmins();
    } catch (error: any) {
      toast.error(error.message || 'Failed to add admin');
    } finally {
      setAdding(false);
    }
  };

  const handleRemoveAdmin = async (id: string) => {
    setDeleting(id);
    try {
      const response = await fetch(`/api/admin/allowed-admins/${id}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to remove admin');
      }

      toast.success('Admin removed successfully');
      fetchAllowedAdmins();
    } catch (error: any) {
      toast.error(error.message || 'Failed to remove admin');
    } finally {
      setDeleting(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-primary-dark">Team Management</h1>
          <p className="text-gray-500 mt-1">
            {isSuperAdmin 
              ? 'Manage who can access the admin dashboard'
              : 'View team members who can access the admin dashboard'
            }
          </p>
        </div>
        
        {isSuperAdmin && (
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-primary-dark hover:bg-primary-medium">
                <UserPlus className="w-4 h-4 mr-2" />
                Add Admin
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Admin</DialogTitle>
                <DialogDescription>
                  Enter the email address of the person you want to grant admin access.
                  They&apos;ll be able to sign in with Google using this email.
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Email Address *</label>
                  <Input
                    type="email"
                    placeholder="admin@example.com"
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Name (optional)</label>
                  <Input
                    placeholder="John Doe"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                  />
                </div>
              </div>
              
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setDialogOpen(false)}
                  disabled={adding}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleAddAdmin}
                  disabled={adding || !newEmail}
                  className="bg-primary-dark hover:bg-primary-medium"
                >
                  {adding ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Adding...
                    </>
                  ) : (
                    'Add Admin'
                  )}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </div>

      {/* Info Card */}
      <Card className="border-accent/20 bg-accent/5">
        <CardContent className="pt-6">
          <div className="flex gap-4">
            {isSuperAdmin ? (
              <Shield className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
            ) : (
              <Lock className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
            )}
            <div className="text-sm text-gray-600">
              <p className="font-medium text-primary-dark mb-1">
                {isSuperAdmin ? 'How it works' : 'View Only'}
              </p>
              <p>
                {isSuperAdmin
                  ? 'Add email addresses to this list to grant admin access. When someone signs in with Google using an email from this list, they\'ll automatically be granted admin privileges and can access the dashboard.'
                  : 'Only the super admin can add or remove team members. Contact the super admin if you need to make changes to the team.'
                }
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Allowed Admins Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Allowed Admins</CardTitle>
          <CardDescription>
            People who can sign in to the admin dashboard
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
            </div>
          ) : allowedAdmins.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <Mail className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <p>No allowed admins yet</p>
              <p className="text-sm mt-1">Add an email address to get started</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Email</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Added By</TableHead>
                  <TableHead>Added On</TableHead>
                  {isSuperAdmin && <TableHead className="w-[80px]"></TableHead>}
                </TableRow>
              </TableHeader>
              <TableBody>
                {allowedAdmins.map((admin) => (
                  <TableRow key={admin.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        {admin.email}
                      </div>
                    </TableCell>
                    <TableCell className="text-gray-500">
                      {admin.name || '—'}
                    </TableCell>
                    <TableCell className="text-gray-500">
                      {admin.addedBy || '—'}
                    </TableCell>
                    <TableCell className="text-gray-500">
                      {format(new Date(admin.createdAt), 'MMM d, yyyy')}
                    </TableCell>
                    {isSuperAdmin && (
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleRemoveAdmin(admin.id)}
                          disabled={deleting === admin.id}
                          className="text-red-500 hover:text-red-600 hover:bg-red-50"
                        >
                          {deleting === admin.id ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : (
                            <Trash2 className="w-4 h-4" />
                          )}
                        </Button>
                      </TableCell>
                    )}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}