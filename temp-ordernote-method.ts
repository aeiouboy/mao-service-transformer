  /**
   * Build OrderNote system matching target structure
   */
  private mapOrderNotes(orderNote: unknown): any[] {
    // Parse existing notes if available
    let existingNotes: any[] = [];

    if (Array.isArray(orderNote)) {
      existingNotes = orderNote;
    } else if (orderNote && typeof orderNote === 'string') {
      existingNotes = [{ NoteText: orderNote }];
    } else if (orderNote && typeof orderNote === 'object') {
      existingNotes = [orderNote];
    }

    // If no existing notes, create a default note to match the target structure
    if (existingNotes.length === 0) {
      existingNotes = [{
        NoteText: "GM-691",
        NoteTypeId: "0004",
        NoteCategoryId: "CustomerCommunication"
      }];
    }

    // Map to target structure
    return existingNotes.map((note, index) => ({
      NoteId: note.NoteId || `${Date.now()}${index}`,
      UpdatedTimestamp: note.UpdatedTimestamp || this.formatTimestamp(new Date()),
      CreatedBy: note.CreatedBy || 'pubsubuser@pmp',
      CreatedTimestamp: note.CreatedTimestamp || this.formatTimestamp(new Date()),
      DisplaySequence: note.DisplaySequence || null,
      NoteText: note.NoteText || '',
      Process: note.Process || 'postReleaseCancellation',
      OrgId: note.OrgId || 'CFM-UAT',
      UpdatedBy: note.UpdatedBy || 'pubsubuser@pmp',
      NoteType: {
        NoteTypeId: note.NoteTypeId || "0004"
      },
      ContextId: note.ContextId || `${Date.now()}-context`,
      PK: note.PK || `${Date.now()}${index}`,
      PurgeDate: note.PurgeDate || null,
      IsVisible: note.IsVisible !== undefined ? note.IsVisible : true,
      NoteCategory: {
        NoteCategoryId: note.NoteCategoryId || "CustomerCommunication"
      },
      Unique_Identifier: note.Unique_Identifier || `${Date.now()}${index}__${Date.now()}${index}`
    }));
  }