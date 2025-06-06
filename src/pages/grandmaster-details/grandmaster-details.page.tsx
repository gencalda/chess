import { useEffect, useState } from "react";
import { useParams } from "react-router";

import { Layout } from "../../components/layout/layout.component";
import { getGrandmasterDetailsAPI } from "../../api/grandmasters/grandmasters.api";
import type { GrandmasterDto } from "../../api/grandmasters/grandmasters.dto";
import { displayText, formatDuration } from "../../utils/text.utils";
import { getTimeSince, msToTime } from "../../utils/date.utils";
import VerifiedIcon from "../../assets/icons/verify-icon.png";

export function GrandmasterDetailsPage() {
  const { username = "" } = useParams();
  const [details, setDetails] = useState<GrandmasterDto>();
  const [isLoading, setIsLoading] = useState(false);
  const [lastOnline, setLastOnline] = useState("");

  useEffect(() => {
    async function loadData() {
      if (!username) {
        return;
      }

      try {
        setIsLoading(true);
        const { data } = await getGrandmasterDetailsAPI(username);
        setDetails(data);
      } catch (error) {
        console.error("Error in fetching grandmaster details: ", error);
      } finally {
        setIsLoading(false);
      }
    }

    loadData();
  }, [username]);

  useEffect(() => {
    if (!details?.last_online) {
      return;
    }

    setInterval(() => {
      const time = getTimeSince(details?.last_online);
      setLastOnline(formatDuration(msToTime(time)));
    }, 1000);
  }, [details?.last_online]);

  if (isLoading) {
    return null;
  }

  return (
    <Layout>
      <div>
        <div className="my-2">
          {/* Header */}
          {details?.avatar ? (
            <img
              src={details?.avatar}
              alt="User avatar"
              className="w-[140px] h-[140px] rounded-full object-cover"
            />
          ) : (
            <div className="w-[140px] h-[140px] rounded-full bg-gray-300 flex items-center justify-center text-sm text-white text-[90px]">
              {details?.name?.trim().charAt(0) || "-"}
            </div>
          )}
          <div className="m-0 py-2">
            <h1 className="text-2xl font-semibold text-gray-900 flex items-center gap-1">
              <a href={details?.url} target="_blank" rel="noopener noreferrer">
                @{details?.username}
              </a>
              {details?.verified ? (
                <img
                  src={VerifiedIcon}
                  alt="Verified Icon"
                  style={{ width: 20, height: 20 }}
                />
              ) : null}
            </h1>
            <div className="m-0 flex items-center gap-1">
              <p className="text-gray-500 text-sm">
                <span className="font-semibold text-gray-800 pr-1">
                  {details?.followers || 0}
                </span>
                followers
              </p>
              {lastOnline ? (
                <>
                  <span className="text-gray-700">•</span>
                  <p className="text-gray-500 text-sm">
                    Online
                    <span className="font-semibold text-gray-800 px-1">
                      {lastOnline}
                    </span>
                    ago
                  </p>
                </>
              ) : null}
            </div>
          </div>

          <div className="my-4 bg-white rounded-lg border border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800 px-4 py-3 bg-gray-100 rounded-t-lg">
              Basic Information
            </h2>
            <div className="divide-y divide-gray-200 text-sm px-4 py-2">
              <div className="py-2 flex justify-between">
                <span className="text-gray-500">Name</span>
                <span className="text-gray-900 font-medium">
                  {displayText(details?.name)}
                </span>
              </div>
              <div className="py-2 flex justify-between">
                <span className="text-gray-500">Location</span>
                <span className="text-gray-900 font-medium">
                  {displayText(details?.location)}
                </span>
              </div>
            </div>
          </div>

          <div className="my-6 bg-white rounded-lg border border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800 px-4 py-3 bg-gray-100 rounded-t-lg">
              Professional Information
            </h2>
            <div className="divide-y divide-gray-200 text-sm px-4 py-2">
              <div className="py-2 flex justify-between">
                <span className="text-gray-500">Title</span>
                <span className="text-gray-900  font-medium">
                  {displayText(details?.title)}
                </span>
              </div>
              <div className="py-2 flex justify-between">
                <span className="text-gray-500">Date joined</span>
                <span className="text-gray-900 font-medium">
                  {details?.joined
                    ? new Date(details?.joined * 1000).toLocaleDateString()
                    : "-"}
                </span>
              </div>
              <div className="py-2 flex justify-between">
                <span className="text-gray-500">League</span>
                <span className="text-gray-900 font-medium">
                  {displayText(details?.league)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
