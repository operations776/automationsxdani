import { createContext, useCallback, useContext, useMemo, useState, ReactNode } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import ContactForm from './contact-form';

interface ContactDialogValue {
  open: (source?: string) => void;
}

const ContactDialogContext = createContext<ContactDialogValue>({ open: () => {} });

export const useContactDialog = () => useContext(ContactDialogContext);

export const ContactDialogProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [source, setSource] = useState('website');

  const open = useCallback((src = 'website') => {
    setSource(src);
    setIsOpen(true);
  }, []);

  const value = useMemo(() => ({ open }), [open]);

  return (
    <ContactDialogContext.Provider value={value}>
      {children}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="font-heading text-xl">Let's build something</DialogTitle>
            <DialogDescription>
              Tell me what you want to automate. It goes straight to my inbox and I'll reply within a business day.
            </DialogDescription>
          </DialogHeader>
          <ContactForm variant="bare" source={source} onSent={() => { /* keep dialog open to show success */ }} />
        </DialogContent>
      </Dialog>
    </ContactDialogContext.Provider>
  );
};
