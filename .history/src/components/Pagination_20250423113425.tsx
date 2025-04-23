import styled from 'styled-components'

const PaginationContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  justify-content: center;
  align-items: center;
`

const PageButton = styled.button<{ active?: boolean }>`
  padding: 0.5rem 1rem;
  background-color: ${({ active }) => (active ? '#5a3eff' : '#fff')};
  color: ${({ active }) => (active ? '#fff' : '#000')};
  border: 1px solid #ccc;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 600;

  &:hover {
    background-color: ${({ active }) => (active ? '#5a3eff' : '#eee')};
  }
`

type Props = {
    currentPage: number
    totalPages: number
    onPageChange: (page: number) => void
}

const Pagination = ({ currentPage, totalPages, onPageChange }: Props) => {
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1)

    return (
        <PaginationContainer>
            {pages.map((page) => (
                <PageButton
                    key={page}
                    onClick={() => onPageChange(page)}
                    active={page === currentPage}
                >
                    {page}
                </PageButton>
            ))}
        </PaginationContainer>
    )
}

export default Pagination
