import { useRecoilState } from 'recoil';
import { formState } from '../../state/formState';
import { useRouter } from 'next/router';
import React from 'react';

export default function useConfigureLogic() {
  const [{ csvData }] = useRecoilState(formState);

  const router = useRouter();
  React.useEffect(
    function redirectToHomeOnEmptyForm() {
      if (csvData.length === 0) {
        router.replace('/');
      }
    },
    [csvData],
  );
  return {
    csvData,
  }
}