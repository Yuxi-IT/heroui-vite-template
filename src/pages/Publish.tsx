import { ArrowLeft, Circles5Random, Comment, Xmark, Plus } from "@gravity-ui/icons";
import { Button, Input, Tabs, TextArea } from "@heroui/react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useImagePreview } from "../components/ImagePreview";

function Publish() {
    const navigate = useNavigate();
    const [images, setImages] = useState<string[]>([]);
    const { showImage } = useImagePreview();

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files) return;

        const newImages = Array.from(files).slice(0, 9 - images.length).map(file => URL.createObjectURL(file));
        setImages([...images, ...newImages]);
    };

    const removeImage = (index: number) => {
        setImages(images.filter((_, i) => i !== index));
    };

    return (
        <>
            <div className="p-4 w-full">
                <Button isIconOnly variant="tertiary" size="sm" onClick={() => navigate(-1)}>
                    <ArrowLeft className="w-5 h-5"/>
                </Button>
            </div>
            <div className="flex flex-col items-center justify-center mx-4">
                <Tabs className="w-full">
                    <Tabs.ListContainer>
                        <Tabs.List aria-label="Options">
                            <Tabs.Tab id="overview">
                                <Circles5Random className="mr-2"/>
                                发需求
                                <Tabs.Indicator />
                            </Tabs.Tab>
                            <Tabs.Tab id="analytics">
                                <Comment className="mr-2"/>
                                发帖子
                                <Tabs.Indicator />
                            </Tabs.Tab>
                        </Tabs.List>
                    </Tabs.ListContainer>
                    <Tabs.Panel className="pt-4" id="overview">
                        <Input className="p-4 text-lg rounded-[25px]" fullWidth placeholder="需求标题"/>
                        <TextArea className="p-6 mt-4 text-lg w-full resize-none rounded-[25px]"  placeholder="整个社区的人都会看到你的需求，而我们会帮你找到最合适的合作者⭐" rows={6}/>
                        <div className="flex gap-2 mt-4 py-2 overflow-x-auto">
                            {images.length < 9 && (
                                <label className="w-[80px] h-[80px] flex-shrink-0 rounded-[15px] bg-gray-200 dark:bg-gray-700 flex items-center justify-center cursor-pointer">
                                    <Plus className="w-8 h-8 text-gray-500"/>
                                    <input type="file" title="img" accept="image/*" multiple className="hidden" onChange={handleImageUpload}/>
                                </label>
                            )}
                            {images.map((img, index) => (
                                <div key={index} className="relative w-[80px] h-[80px] flex-shrink-0">
                                    <img src={img} alt="" className="w-full h-full rounded-[15px] object-cover cursor-pointer" 
                                    onClick={() => showImage(img)}/>
                                    <Button isIconOnly size="sm" className="absolute -top-1 -right-1 w-5 h-5" onClick={() => removeImage(index)}>
                                        <Xmark className="w-3 h-3"/>
                                    </Button>
                                </div>
                            ))}
                        </div>
                    </Tabs.Panel>

                    <Tabs.Panel className="pt-4" id="analytics">
                        <Input className="p-4 text-lg rounded-[25px]" fullWidth placeholder="帖子标题"/>
                        <TextArea className="p-6 mt-4 text-lg resize-none rounded-[25px]" fullWidth placeholder="分享你的想法和经验。比如告诉大家你最近的新想法⭐" rows={6}/>
                        <div className="flex gap-2 mt-4 py-2 overflow-x-auto">
                            {images.length < 9 && (
                                <label className="w-[80px] h-[80px] flex-shrink-0 rounded-[15px] bg-gray-200 dark:bg-gray-700 flex items-center justify-center cursor-pointer">
                                    <Plus className="w-8 h-8 text-gray-500"/>
                                    <input type="file" title="img" accept="image/*" multiple className="hidden" onChange={handleImageUpload}/>
                                </label>
                            )}
                            {images.map((img, index) => (
                                <div key={index} className="relative w-[80px] h-[80px] flex-shrink-0">
                                    <img src={img} alt="" className="w-full h-full rounded-[15px] object-cover cursor-pointer" 
                                    onClick={() => showImage(img)}/>
                                    <Button isIconOnly size="sm" className="absolute -top-1 -right-1 w-5 h-5" onClick={() => removeImage(index)}>
                                        <Xmark className="w-3 h-3"/>
                                    </Button>
                                </div>
                            ))}
                        </div>
                    </Tabs.Panel>
                </Tabs>
            </div>
            
        </>
    );
}

export default Publish;