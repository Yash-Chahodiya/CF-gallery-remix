import { faPaperclip } from "@fortawesome/pro-solid-svg-icons/faPaperclip";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import axios from "axios";
import { useEffect, useState } from "react";
import AddAttachmentsCard from "~/components/AddAttachmentsCard";
import { CFTypography } from "~/components/third-party/ant-design";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  const [isClient, setIsClient] = useState(false);
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://api-beta.contractorforeman.net/service.php",
        {
          params: {
            company_id: 829,
            user_id: 109871,
            op: "get_project_permit_detail",
            curr_time: new Date().toISOString().slice(0, 19).replace("T", " "),
            force_login: "0",
            global_project: "",
            version: "web",
            from: "panel",
            tz: "+05:30",
            tzid: "Asia/Calcutta",
            iframe_call: 0,
            permit_id: "2984",
          },
          headers: {
            "Content-Type": "application/json",
            Authorization:
              "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6ImhhcnNoaWwuc2FraGl5YSs4NTQ1QHdlZW5nZ3MuaW4iLCJ1c2VyX2lkIjoxMDk4NzEsImNvbXBhbnlfaWQiOjgyOSwiZW1haWwiOiJoYXJzaGlsLnNha2hpeWErODU0NUB3ZWVuZ2dzLmluIiwiZnVsbE5hbWUiOiJoYXJzaGlsIHRlc3QiLCJyb2xlX2lkIjo5MjQ4NCwiY2ZfdG9rZW4iOiIkMmEkMTIkZTAzMDQ4ZmQxZTI0NmYwNGRiNWJlZTQ5NzV6enE0UkpadTlCT2JRSE9keklpZnJEL0piLzZfMF8wIn0.hlkooYTtEgZ0gIkWx1_4FcqYfStlfQ6kfiaA0KHLRkg",
          },
        }
      );

      setData(response.data.data.aws_files);
      console.log(response.data.data);
    } catch (error) {
      console.error("Error fetching AWS files:", error);
    }
  };

  useEffect(() => {
    setIsClient(true);

    fetchData();
  }, []);

  return (
    <div className="flex flex-col  gap-2  bg-white dark:bg-dark-800 py-[5px] px-3 shadow-[0_4px_24px_0] shadow-[#22292f1a] rounded-md">
      <div className="grid gap-2.5 mt-1.5">
        <CFTypography
          title="small"
          className="text-[#4B4B4B] text-xl font-semibold flex gap-2 items-center"
        >
          <FontAwesomeIcon icon={faPaperclip} /> Attachments
        </CFTypography>
      </div>
      <span className=" border border-[#e5e7eb] w-full"></span>

      <div className="flex  items-start flex-wrap gap-3.5 my-1.5">
        <AddAttachmentsCard
          files={data}
          onChange={() => {
            console.log("files");
          }}
          newFileOnly={true}
          isView={false}
          hideBorder={true}
          deleteFile={fetchData}
          onAddMarkUp={() => {}}
          readOnly={false}
        />
      </div>
    </div>
  );
}
