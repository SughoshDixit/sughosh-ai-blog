
import { Download, Mail, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ContactInfo() {
  return (
    <div className="space-y-6">
      <div className="flex items-start gap-4">
        <div className="p-2 rounded-md bg-primary/10">
          <Mail className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h4 className="font-medium mb-1">Email</h4>
          <p className="text-muted-foreground">
            sughoshpdixit@gmail.com
          </p>
        </div>
      </div>
      
      <div className="flex items-start gap-4">
        <div className="p-2 rounded-md bg-primary/10">
          <Phone className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h4 className="font-medium mb-1">Phone</h4>
          <p className="text-muted-foreground">
            +91 8310080859
          </p>
        </div>
      </div>
      
      <div className="flex items-start gap-4">
        <div className="p-2 rounded-md bg-primary/10">
          <MapPin className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h4 className="font-medium mb-1">Location</h4>
          <p className="text-muted-foreground">
            Bangalore, India
          </p>
        </div>
      </div>
      
      <div className="pt-4 border-t border-border">
        <Button variant="outline" className="w-full" asChild>
          <a 
            href="https://drive.google.com/file/d/16f0CT3Yvo9GU_2Pw6KPCrHvEnyHa1kP8/view?usp=sharing" 
            className="flex items-center justify-center gap-2"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Download className="h-4 w-4" />
            <span>Download Resume</span>
          </a>
        </Button>
      </div>
    </div>
  );
}
