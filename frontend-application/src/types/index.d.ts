type TreeDto = {
  title: string;
  children: TreeDto[];
};

interface ImportsResponseDto {
  rootfile?: string;
  data: TreeDto[];
}
