import { useProjectIdInUrl } from 'screens/kanban/util';
import { useProject } from 'utils/project';

export const useProjectInUrl = () => useProject(useProjectIdInUrl());

export const useEpicSearchParams = () => ({ projectId: useProjectIdInUrl() });
export const useEpicsQueryKey = () => ['epics', useEpicSearchParams()];
