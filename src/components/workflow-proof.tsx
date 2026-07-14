import { useState } from 'react';
import { Maximize2, ZoomIn, ZoomOut } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { asset } from '@/lib/asset';

/* A link under a case study demo that opens the actual workflow build
   full size. The demos explain the idea; this proves it was really
   built. Workflow canvases are wide, so the viewer opens at full
   resolution and pans, with a zoom-to-fit toggle. */

interface WorkflowProofProps {
  image: string;
  title: string;
  caption?: string;
}

const WorkflowProof = ({ image, title, caption }: WorkflowProofProps) => {
  const [open, setOpen] = useState(false);
  /* true = fit to the dialog, false = full resolution and pan */
  const [fit, setFit] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => {
          setFit(false);
          setOpen(true);
        }}
        className="mt-3 inline-flex items-center gap-2 text-sm font-bold text-primary hover:text-primary-hover transition-colors"
      >
        <Maximize2 className="w-3.5 h-3.5" />
        See the real workflow
      </button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-6xl p-0 overflow-hidden">
          <DialogHeader className="px-5 pt-5 pb-3 flex-row items-center justify-between gap-4 space-y-0">
            <DialogTitle className="font-heading text-lg text-left">{title}</DialogTitle>
            <button
              type="button"
              onClick={() => setFit((f) => !f)}
              className="mr-8 inline-flex items-center gap-1.5 shrink-0 rounded-full border-2 border-border px-3 py-1.5 text-xs font-bold text-muted-foreground hover:border-primary hover:text-primary transition-colors"
            >
              {fit ? <ZoomIn className="w-3.5 h-3.5" /> : <ZoomOut className="w-3.5 h-3.5" />}
              {fit ? 'Full size' : 'Fit to screen'}
            </button>
          </DialogHeader>

          <div className="bg-muted/60 overflow-auto max-h-[68vh]">
            <img
              src={asset(image)}
              alt={title}
              className={fit ? 'w-full h-auto' : 'max-w-none h-auto'}
              loading="lazy"
            />
          </div>

          {caption && (
            <p className="px-5 py-4 text-sm text-muted-foreground leading-relaxed">
              {caption}
              {!fit && (
                <span className="block mt-1 text-xs text-muted-foreground/80">
                  Scroll to pan around the canvas.
                </span>
              )}
            </p>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default WorkflowProof;
