import React, { useState } from "react";
import { VotesModel } from "../../interfaces/VotesModel";
import VotesTable from "./VotesTable";
import VotesUpdateForm from "./VotesUpdateForm";

const Votes = () => {
  const [voteUpdateForm, setVoteUpdateForm] = useState(false);
  const [voteUpdateData, setVoteUpdateData] = useState<null | VotesModel>(null);
  return (
    <div className="container">
      {!voteUpdateForm && (
        <VotesTable
          setVoteUpdateData={setVoteUpdateData}
          setVoteUpdateForm={setVoteUpdateForm}
          voteUpdateForm={voteUpdateForm}
        />
      )}
      {voteUpdateForm && <VotesUpdateForm voteUpdateData={voteUpdateData} />}
    </div>
  );
};

export default Votes;
