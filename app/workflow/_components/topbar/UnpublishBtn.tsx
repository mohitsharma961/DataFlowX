"use client";

import { PublishWorkflow } from '@/actions/workflows/PublishWorkflow';
import { UnpublishWorkflow } from '@/actions/workflows/unpublishWorkflow';
import useExecutionPlan from '@/components/hooks/useExecutionPlan';
import { Button } from '@/components/ui/button';
import { useReactFlow } from '@xyflow/react';
import { DownloadIcon, UploadIcon } from 'lucide-react';
import React, { useState } from 'react';
import { toast } from 'sonner';

const UnpublishBtn = ({ workflowId }: { workflowId: string }) => {
  const [isLoading, setIsLoading] = useState(false);
 
  const handlePublish = async () => {
   

    setIsLoading(true);
    toast.loading("unpublishing workflow...", { id: "flow-publish" });

    try {
      await UnpublishWorkflow(workflowId);
      toast.success("Workflow Unpublished successfully", { id: "flow-publish" });
    } catch (error) {
      console.error('UnPublish error:', error);
      toast.error(
        `UnPublishing failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
        { id: "flow-publish" }
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      variant="outline"
      className="flex items-center gap-2"
      disabled={isLoading}
      onClick={handlePublish}
    >
      <DownloadIcon size={16} className="stroke-orange-400" />
      Unpublish
    </Button>
  );
};

export default UnpublishBtn;
