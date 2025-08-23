
'use client';

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";

export default function SettingsPage() {
  return (
    <div className="mx-auto grid w-full max-w-6xl gap-6">
      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>General Settings</CardTitle>
            <CardDescription>Manage your store's general information.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
                <Label htmlFor="store-name">Store Name</Label>
                <Input id="store-name" defaultValue="PCB Flow" />
            </div>
             <div className="space-y-2">
                <Label htmlFor="store-description">Store Description</Label>
                <Textarea id="store-description" defaultValue="High-quality PCB fabrication and assembly." />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Manufacturing Options</CardTitle>
            <CardDescription>
              Configure the manufacturing capabilities and options available to customers.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="flex flex-col gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="min-trace-width">Minimum Trace Width (mil)</Label>
                    <Input id="min-trace-width" defaultValue="5" type="number" />
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="min-trace-spacing">Minimum Trace Spacing (mil)</Label>
                    <Input id="min-trace-spacing" defaultValue="5" type="number" />
                </div>
              </div>
              <div className="space-y-2">
                  <Label>Available Finishes</Label>
                  <div className="flex flex-wrap gap-4 pt-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="finish-hasl" defaultChecked />
                        <Label htmlFor="finish-hasl">HASL</Label>
                      </div>
                       <div className="flex items-center space-x-2">
                        <Checkbox id="finish-hasl-lf" defaultChecked />
                        <Label htmlFor="finish-hasl-lf">Lead-Free HASL</Label>
                      </div>
                       <div className="flex items-center space-x-2">
                        <Checkbox id="finish-enig" defaultChecked />
                        <Label htmlFor="finish-enig">ENIG</Label>
                      </div>
                       <div className="flex items-center space-x-2">
                        <Checkbox id="finish-osp" />
                        <Label htmlFor="finish-osp">OSP</Label>
                      </div>
                  </div>
              </div>
            </form>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Notifications</CardTitle>
            <CardDescription>
              Manage how you receive notifications about your store.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-6">
            <div className="flex items-center justify-between space-x-4">
              <Label htmlFor="new-orders" className="flex flex-col space-y-1">
                <span>New Orders</span>
                <span className="font-normal leading-snug text-muted-foreground">
                  Receive an email notification for every new order.
                </span>
              </Label>
              <Switch id="new-orders" defaultChecked />
            </div>
            <div className="flex items-center justify-between space-x-4">
              <Label htmlFor="dfm-review" className="flex flex-col space-y-1">
                <span>DFM Review Requests</span>
                <span className="font-normal leading-snug text-muted-foreground">
                  Notify when a customer requests a manual DFM review.
                </span>
              </Label>
              <Switch id="dfm-review" />
            </div>
          </CardContent>
        </Card>
        <Card>
            <CardHeader>
                <CardTitle>Admin Account</CardTitle>
                <CardDescription>Manage your personal admin account settings.</CardDescription>
            </CardHeader>
             <CardContent className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="admin-email">Email</Label>
                    <Input id="admin-email" defaultValue="admin@pcbflow.com" />
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="admin-password">Password</Label>
                    <Button variant="outline">Change Password</Button>
                </div>
            </CardContent>
            <CardFooter className="border-t px-6 py-4">
                <Button>Save All Changes</Button>
            </CardFooter>
        </Card>
      </div>
    </div>
  )
}
