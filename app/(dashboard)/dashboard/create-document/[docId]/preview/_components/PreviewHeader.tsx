import { deductUserCredit } from "@/app/actions/deductUserCredit";
import { saveDocument } from "@/app/actions/saveDocument";
import { updateDocumentInDB } from "@/app/actions/updateDocument";
import { Button } from "@/components/ui/button";
import { deleteLocalDraft } from "@/lib/deleteLocalDraft";
import useStore from "@/store/DocumentStore";
import { useEditDocStore } from "@/store/EditDocumentStore";
import { useUserStore } from "@/store/UserStore";
import { useUser } from "@clerk/nextjs";
import { ArrowLeft, BrainCog, RotateCcw, Save } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";


export default function PreviewHeader({
    onReset,
    onDownload,
    isEdit,
}: {
    onReset: () => void;
    onDownload: () => void;
    isEdit?: boolean;
}) {
    const { user, isLoaded } = useUser();
    const router = useRouter();

    const handleSaveDocument = async () => {
        const availableUserCredits = useUserStore.getState().user?.creditsAvailable;

        if (!isEdit && availableUserCredits === 0 || availableUserCredits! < 0) {
            alert("Top up your credits to continue");
            toast.error("Insufficient credits... Please Recharge");
            return;
        }

        toast.loading("Saving Document");

        // Get state based on isEdit
        let state = isEdit ? useEditDocStore.getState() : useStore.getState();


        let docId = state.docId;

        if (!docId) {
            docId = uuidv4();
            if (isEdit) {
                useEditDocStore.setState({ docId });
            } else {
                useStore.setState({ docId });
            }
        }
        let result;

        if (isEdit) {
            result = await updateDocumentInDB({
                ...state.document!,
                docId,
            });
            deleteLocalDraft(docId);
            useEditDocStore.setState(clearState);
            useStore.setState(clearState);
            toast.success("Document Edited Successfully!");
            router.replace(`/document/view/${docId}`);


        } else {
            result = await saveDocument({
                ...state.document!,
                docId,
            });
            if (
                result &&
                typeof result === "object" &&
                "success" in result &&
                result.success &&
                "data" in result &&
                result.data
            ) {
                const newDocId = result.data.docId;

                deleteLocalDraft(docId);

                useStore.setState(clearState);
                toast.success("Document saved Successfully!");
                deductUserCredit(user?.id!);
                router.replace(`/document/view/${newDocId}`);
                toast.dismiss();
                return;
            }
        }
    };

    const handleBack = () => {
        router.back();
    };

    return (
        <div className="fixed top-0 w-full md:sticky md:top-20 z-30 bg-white dark:bg-gray-900 border-b p-4 lg:p-6 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-y-0">
            <div className="flex items-center gap-2 sm:gap-4 flex-wrap">
                <Button variant="ghost" size="sm" onClick={handleBack} className="gap-2">
                    <ArrowLeft className="w-4 h-4" />
                    Back
                </Button>
                <h1 className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-900 dark:text-white">
                    Document Preview
                </h1>
            </div>

            <div className="flex flex-row mt-4 md:mt-0 gap-2 md:gap-4">
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={onReset}
                    className="gap-2 text-red-600 dark:text-rose-400 hover:bg-red-50"
                >
                    <RotateCcw className="w-4 h-4" />
                    Reset
                </Button>
                <Button variant="secondary" size="sm" className="gap-2">
                    <BrainCog className="w-4 h-4" />
                    Improve with AI
                </Button>
                {isLoaded && (
                    <Button
                        variant="default"
                        className="gap-2 bg-emerald-700 hover:bg-gray-800 text-white"
                        onClick={handleSaveDocument}
                    >
                        <Save className="w-4 h-4" />
                        {isEdit ? "Update Document" : "Save Document"}
                    </Button>
                )}
            </div>
        </div>
    );
}


// Constants

const clearState = {
    document: {
        DocTitle: "",
        doctype: "",
        ClientName: "",
        ClientEmail: "",
        ServiceScope: [""],
        PricingAmount: 0,
        Currency: "",
        Type: "",
        StartDate: "",
        EndDate: "",
        docId: "",
        Duration: "",
        CustomContent: "",
    },
    docId: null,
};