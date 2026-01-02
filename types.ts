
export enum ArchitectureType {
  RULE_BASED = 'Rule-based systems',
  CLASSICAL_ML = 'Classical ML pipelines',
  DEEP_LEARNING = 'Deep Learning architectures',
  TRANSFORMER = 'Transformer architecture',
  RAG = 'RAG (Retrieval-Augmented Generation)',
  AGENT_BASED = 'Agent-based architecture',
  MULTI_AGENT = 'Multi-agent systems',
  TOOL_USING = 'Tool-using AI systems',
  AUTONOMOUS_WORKFLOWS = 'Autonomous AI workflows',
  PRODUCT_ARCH = 'AI product/system architecture (end-to-end)'
}

export interface LessonContent {
  id: ArchitectureType;
  title: string;
  problem: string;
  diagramDescription: string;
  components: {
    model: string;
    dataFlow: string;
    memory: string;
    orchestration: string;
  };
  previousDifference: string;
  currentUseCases: string[];
  analogy: string;
  whenNotToUse: string;
  pythonSnippet: string;
}

export const ARCHITECTURE_ROADMAP: ArchitectureType[] = [
  ArchitectureType.RULE_BASED,
  ArchitectureType.CLASSICAL_ML,
  ArchitectureType.DEEP_LEARNING,
  ArchitectureType.TRANSFORMER,
  ArchitectureType.RAG,
  ArchitectureType.AGENT_BASED,
  ArchitectureType.MULTI_AGENT,
  ArchitectureType.TOOL_USING,
  ArchitectureType.AUTONOMOUS_WORKFLOWS,
  ArchitectureType.PRODUCT_ARCH
];
