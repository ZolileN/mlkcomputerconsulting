import { useState, useEffect } from 'react';
import { Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import '../styles/TeamViewerDownload.css';

const TeamViewerDownload = () => {
  const [os, setOs] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Detect user's operating system
    const detectOS = () => {
      const userAgent = window.navigator.userAgent;
      const platform = window.navigator.platform;
      
      if (/Mac|iPhone|iPod|iPad/i.test(platform)) {
        return 'mac';
      } else if (/Win/.test(platform)) {
        return 'windows';
      } else if (/Linux/.test(platform) && !/Android/.test(userAgent)) {
        return 'linux';
      } else if (/Android/.test(userAgent)) {
        return 'android';
      } else if (/iPhone|iPad|iPod/.test(platform) || (platform === 'MacIntel' && navigator.maxTouchPoints > 1)) {
        return 'ios';
      }
      return 'unknown';
    };

    setOs(detectOS());
    setIsLoading(false);
  }, []);

  const getDownloadLink = () => {
    switch(os) {
      case 'windows':
        return 'https://download.teamviewer.com/download/TeamViewerQS.exe';
      case 'mac':
        return 'https://download.teamviewer.com/download/TeamViewerQS.dmg';
      case 'linux':
        return 'https://download.teamviewer.com/download/linux/teamviewer_amd64.deb';
      case 'android':
        return 'https://play.google.com/store/apps/details?id=com.teamviewer.quicksupport.market';
      case 'ios':
        return 'https://apps.apple.com/app/teamviewer-quicksupport/id806951658';
      default:
        return 'https://www.teamviewer.com/en/download/';
    }
  };

  const getButtonText = () => {
    if (isLoading) return 'Detecting your OS...';
    
    switch(os) {
      case 'windows':
        return 'Download TeamViewer QuickSupport for Windows';
      case 'mac':
        return 'Download TeamViewer QuickSupport for Mac';
      case 'linux':
        return 'Download TeamViewer QuickSupport for Linux';
      case 'android':
        return 'Get TeamViewer QuickSupport on Google Play';
      case 'ios':
        return 'Get TeamViewer QuickSupport on App Store';
      default:
        return 'Download TeamViewer QuickSupport';
    }
  };

  return (
    <div className="teamviewer-download">
      <Button 
        asChild
        className="bg-[#0E8EEB] hover:bg-[#0c7bc9] text-white"
      >
        <a 
          href={getDownloadLink()} 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center gap-2"
        >
          <Download className="h-4 w-4" />
          {getButtonText()}
        </a>
      </Button>
      {os === 'ios' && (
        <p className="text-sm text-muted-foreground mt-2">
          Note: On iOS, please install TeamViewer QuickSupport from the App Store and share the displayed ID with our support team.
        </p>
      )}
    </div>
  );
};

export default TeamViewerDownload;
