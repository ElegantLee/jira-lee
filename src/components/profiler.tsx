import React, { ProfilerOnRenderCallback, ProfilerProps } from 'react';

type Props = {
  metadata?: any;
  phases?: ('mount' | 'update')[];
} & Omit<ProfilerProps, 'onRender'>;

let queue: unknown[] = [];

const sendProfilerQueue = () => {
  if (!queue.length) return;
  const queueToSend = [...queue];
  queue = [];
  console.log(queueToSend);
};

setInterval(sendProfilerQueue, 5000);

export const JiraProfiler = ({ metadata, phases, ...props }: Props) => {
  const reportProfiler: ProfilerOnRenderCallback = (
    id,
    phase,
    actualDuration,
    baseDuration,
    startTime,
    commitTime,
    interactions
  ) => {
    if (!phases || phases.includes(phase)) {
      queue.push({
        id,
        phase,
        actualDuration,
        baseDuration,
        startTime,
        commitTime,
        interactions,
        metadata,
      });
    }
  };

  return <React.Profiler onRender={reportProfiler} {...props} />;
};
