import {
  loadLinks,
  addLink,
  deleteLinks,
  updateLinks,
} from "../models/shortnerModel.js";
export const getShortnerPage = async (req, res) => {
 if (!req.user) {
    return res.status(401).json({ message: "Please login" });
  }
   const links = await loadLinks();
    res.json({links})
}

export const createLink = async (req, res) => {
    const { url, short_code } = req.body;
    const newLinkId = await addLink(url, short_code);
    return res.status(201).json({ success: true, newLinkId });
}

export const deleteLink = async (req, res) => {
  const deleted = await deleteLinks(req.params.id);
  deleted === 0 
    ? res.status(404).json({ success: false, message: "Not found" })
    : res.json({ success: true });
};

export const updateLink = async (req, res) => {
  const updated = await updateLinks(req.params.id, req.body.url);
  updated === 0
    ? res.status(404).json({ success: false })
    : res.json({ success: true });
};

