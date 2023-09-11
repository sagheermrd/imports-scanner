type TreeDto = {
  title: string;
  children: TreeDto[];
};

interface ScanImportsResponseDto {
  rootfile?: string;
  data: TreeDto[];
}
